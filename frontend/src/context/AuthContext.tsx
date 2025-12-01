import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  // add more fields as your backend returns them
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On first load, try to hydrate user from localStorage
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("auth:user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      // ignore parse errors and start with empty user
      console.error("Failed to parse stored auth user", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (nextUser: AuthUser) => {
    setUser(nextUser);
    window.localStorage.setItem("auth:user", JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("auth:user");
  };

  const value: AuthContextValue = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
