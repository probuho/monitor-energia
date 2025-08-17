import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tutorial from "./Tutorial";

interface RegisterFormData {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio");
      return false;
    }
    
    if (!formData.email.trim()) {
      setError("El email es obligatorio");
      return false;
    }
    
    if (!formData.password) {
      setError("La contraseña es obligatoria");
      return false;
    }
    
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("¡Usuario registrado exitosamente! Redirigiendo...");
        setFormData({
          nombre: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
        
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Error en el registro");
      }
    } catch (err) {
      setError("Error de conexión. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 id="register-title" className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Únete al Monitor de Energía
          </p>
          <button
            onClick={() => setShowTutorial(true)}
            className="mt-3 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            🎯 ¿Cómo registrarse? Ver Tutorial
          </button>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="nombre-input"
                name="nombre"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="email-input"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="password-input"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}
          
          {success && (
            <div className="text-green-600 text-sm text-center bg-green-50 p-3 rounded-md">
              {success}
            </div>
          )}

          <div>
            <button
              id="register-button"
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <button
                id="login-link"
                type="button"
                onClick={() => navigate("/login")}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </form>
      </div>

      <Tutorial 
        isOpen={showTutorial} 
        onClose={() => setShowTutorial(false)} 
        tutorialType="register" 
      />
    </div>
  );
};

export default RegisterForm;
