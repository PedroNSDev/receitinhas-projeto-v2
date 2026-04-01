import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string) => string | null;
  logout: () => void;
  requireAuth: (callback: () => void) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  signup: () => null,
  logout: () => {},
  requireAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface StoredUser {
  username: string;
  password: string;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem("currentUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  const getUsers = (): StoredUser[] => {
    try {
      const stored = localStorage.getItem("registeredUsers");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const signup = (username: string, password: string): string | null => {
    const users = getUsers();
    if (users.find((u) => u.username.toLowerCase() === username.toLowerCase())) {
      return "Nome de usuário já existe";
    }
    if (password.length < 4) {
      return "Senha deve ter pelo menos 4 caracteres";
    }
    users.push({ username, password });
    localStorage.setItem("registeredUsers", JSON.stringify(users));
    setUser({ username });
    return null;
  };

  const login = (username: string, password: string): boolean => {
    const users = getUsers();
    const found = users.find(
      (u) => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );
    if (found) {
      setUser({ username: found.username });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const requireAuth = (callback: () => void) => {
    if (user) {
      callback();
    } else {
      setPendingCallback(() => callback);
      setShowLoginPrompt(true);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout, requireAuth }}>
      {children}
      {showLoginPrompt && (
        <AuthPromptModal
          onClose={() => { setShowLoginPrompt(false); setPendingCallback(null); }}
          onSuccess={() => {
            setShowLoginPrompt(false);
            pendingCallback?.();
            setPendingCallback(null);
          }}
        />
      )}
    </AuthContext.Provider>
  );
};

// Inline modal prompt for auth-gated actions
import { useNavigate } from "react-router-dom";

const AuthPromptModal = ({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-card border border-border rounded-2xl p-6 mx-4 max-w-sm w-full shadow-xl"
      >
        <h3 className="font-heading font-bold text-lg text-foreground text-center">Faça login primeiro</h3>
        <p className="text-sm text-muted-foreground text-center mt-2 font-body">
          Você precisa ter uma conta para usar essa funcionalidade.
        </p>
        <div className="flex gap-3 mt-5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-border text-foreground font-body text-sm font-medium hover:bg-muted transition-colors"
          >
            Cancelar
          </button>
          <AuthPromptLoginButton onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

const AuthPromptLoginButton = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => { onClose(); navigate("/login"); }}
      className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-body text-sm font-medium hover:bg-primary/90 transition-colors"
    >
      Entrar
    </button>
  );
};
