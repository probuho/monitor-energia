import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Tutorial from "./Tutorial";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        // Redirigir a la página original o al dashboard por defecto
        const from = (location.state as any)?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      } else {
        setError("Credenciales inválidas");
      }
    } catch (err) {
      setError("Error en el inicio de sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 id="login-title" className="text-center text-3xl font-bold text-gray-900">Iniciar sesión</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Accede a tu cuenta para monitorear tu consumo energético
          </p>
          <button
            onClick={() => setShowTutorial(true)}
            className="mt-3 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            🎯 ¿Cómo usar el sistema? Ver Tutorial
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            id="email-input"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full p-3 border rounded"
            required
          />
          
          <input
            id="password-input"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-3 border rounded"
            required
          />

          {error && <div className="text-red-600 text-center">{error}</div>}

          <button
            id="login-button"
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="text-center">
          <button
            id="register-link"
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline"
          >
            ¿No tienes cuenta? Regístrate
          </button>
        </div>
      </div>

      <Tutorial 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
        tutorialType="login" 
      />
    </div>
  );
};

export default LoginForm;
