// Configuración de la API
const getApiUrl = () => {
  // En desarrollo (localhost), usar el proxy de Vite
  if (import.meta.env.DEV) {
    return '';
  }
  
  // En producción (Vercel), usar la variable de entorno o el backend de Render
  return import.meta.env.VITE_API_URL || 'https://monitor-energia-backend.onrender.com';
};

export const API_BASE_URL = getApiUrl();

// Función para construir URLs completas de la API
export const buildApiUrl = (endpoint: string) => {
  const baseUrl = API_BASE_URL;
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// URLs específicas de la API
export const API_ENDPOINTS = {
  // Autenticación
  REGISTER: '/api/auth/registro',
  LOGIN: '/api/auth/login',
  PROFILE: '/api/auth/perfil',
  SESSION: '/api/auth/session',
  
  // Consumo
  CONSUMO: '/api/consumo',
  CONSUMO_USUARIO: (userId: string) => `/api/consumo/usuario/${userId}`,
  
  // Health check
  HEALTH: '/api/health',
  TEST: '/api/test',
} as const;

// Función para hacer peticiones a la API
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = buildApiUrl(endpoint);
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
