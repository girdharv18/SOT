package com.mindcurepath.backend.auth.jwt;

import com.mindcurepath.backend.auth.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
    @Value("${jwt.secretkey}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private Long jwtExpiration;

    public Long extractUserId(String jwtToken) {
        String userId = extractClaim(jwtToken, claims -> claims.get("userId", String.class));
        return userId != null ? Long.parseLong(userId) : null;
    }
    public String extractUsername(String jwtToken) {
        return extractClaim(jwtToken, Claims::getSubject);
    }

    private <T> T extractClaim(String jwtToken, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(jwtToken);
        return claimsResolver.apply(claims);
    }

   private Claims extractAllClaims(String jwtToken) {
      return Jwts.parser()
              .verifyWith(getSignInKey()) // SecretKey for signature verification
              .build()
              .parseSignedClaims(jwtToken)      // parse the JWS
              .getPayload();                     // get Claims (payload)
   }

   private SecretKey getSignInKey() {
       return Keys.hmacShaKeyFor(secretKey.getBytes());
    }
   public boolean isTokenValid(String jwtToken, UserDetails userDetails) {
      final String username = extractUsername(jwtToken);
      return username.equals(userDetails.getUsername()) && !isTokenExpired(jwtToken);
   }


   private boolean isTokenExpired(String jwtToken) {
        return extractExpiration(jwtToken).before(new Date());
    }

    private Date extractExpiration(String jwtToken) {
        return extractClaim(jwtToken, Claims::getExpiration);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        if (userDetails instanceof User u && u.getId() != null) {
            claims.put("userId", String.valueOf(u.getId()));
        }
        return generateToken(claims, userDetails);
    }

    private String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSignInKey())
                .compact();
    }

   public String extractUserFromRequest(HttpServletRequest request) {
      // Extract the token from the "Authorization" header or from a cookie
      final String authHeader = request.getHeader("Authorization");

      String jwt = null;
      if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
         jwt = authHeader.substring(7);
      } else if (request.getCookies() != null) {
         for (var cookie : request.getCookies()) {
            if (cookie.getName().equals("jwt")) {
               jwt = cookie.getValue();
               break;
            }
         }
      }
      if (jwt != null) {
         return extractUsername(jwt); // this should already exist in your JwtService
      }
      return null;
   }
}
