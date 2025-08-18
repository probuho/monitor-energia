// Configuración para suprimir advertencias de React Router
export const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
  // Configuraciones adicionales para mejorar la experiencia
  basename: '/',
  window: typeof window !== 'undefined' ? window : undefined,
};
