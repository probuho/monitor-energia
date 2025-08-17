import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Usuario {
  _id: string;
  nombre: string;
  email: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay una sesión guardada al cargar
  useEffect(() => {
    const sesionGuardada = localStorage.getItem("usuario");
    if (sesionGuardada) {
      try {
        const usuarioData = JSON.parse(sesionGuardada);
        setUsuario(usuarioData);
      } catch (error) {
        localStorage.removeItem("usuario");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        const usuarioData = {
          _id: data.usuario._id,
          nombre: data.usuario.nombre,
          email: data.usuario.email,
        };
        
        setUsuario(usuarioData);
        localStorage.setItem("usuario", JSON.stringify(usuarioData));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error en login:", error);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  const value: AuthContextType = {
    usuario,
    login,
    logout,
    loading,
    isAuthenticated: !!usuario,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
