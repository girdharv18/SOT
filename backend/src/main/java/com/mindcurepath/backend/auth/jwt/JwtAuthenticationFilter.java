package com.mindcurepath.backend.auth.jwt;

import com.mindcurepath.backend.auth.service.impl.CustomUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

   private final CustomUserDetailService customUserDetailService;
   private final JwtService jwtService;

   @Override
   protected void doFilterInternal(HttpServletRequest request,
                                   HttpServletResponse response,
                                   FilterChain filterChain) throws ServletException, IOException {

      String path = request.getRequestURI();

      // Skip only truly public endpoints (login and register)
      if (path.equals("/api/auth/register") ||
              path.equals("/api/auth/login") ||
              path.equals("/health") ||
              path.equals("/") ||
              path.equals("/actuator/health")) {

         filterChain.doFilter(request, response);
         return;
      }

      // Extract JWT from header or cookie
      String jwtToken = extractJwtFromRequest(request);
      if (jwtToken == null) {
         filterChain.doFilter(request, response);
         return;
      }

      // Validate JWT and extract username/email
      String username = jwtService.extractUsername(jwtToken);
      if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

         // Load user details from your service
         var userDetails = customUserDetailService.loadUserByUsername(username);

         if (jwtService.isTokenValid(jwtToken, userDetails)) {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
         }
      }

      filterChain.doFilter(request, response);
   }

   private String extractJwtFromRequest(HttpServletRequest request) {
      // 1. Authorization header
      final String authHeader = request.getHeader("Authorization");
      if (authHeader != null && authHeader.startsWith("Bearer ")) {
         return authHeader.substring(7);
      }

      // 2. Cookie
      Cookie[] cookies = request.getCookies();
      if (cookies != null) {
         for (Cookie cookie : cookies) {
            if ("JWT".equals(cookie.getName())) {
               return cookie.getValue();
            }
         }
      }

      return null;
   }
}
