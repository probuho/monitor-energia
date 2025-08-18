// Script para suprimir advertencias del navegador
(function() {
  'use strict';
  
  // Suprimir advertencias de CSS no estándar
  const originalConsoleWarn = console.warn;
  console.warn = function(...args) {
    const message = args[0];
    
    // Filtrar advertencias específicas que no son críticas
    if (typeof message === 'string') {
      if (message.includes('Unknown property') && message.includes('zoom')) {
        return; // Suprimir advertencias de zoom
      }
      if (message.includes('Unknown pseudo-class') && message.includes('has')) {
        return; // Suprimir advertencias de :has
      }
      if (message.includes('Declaration dropped')) {
        return; // Suprimir advertencias de declaraciones CSS ignoradas
      }
    }
    
    // Mostrar otras advertencias normalmente
    originalConsoleWarn.apply(console, args);
  };
  
  // Suprimir errores de parsing CSS no críticos
  const originalConsoleError = console.error;
  console.error = function(...args) {
    const message = args[0];
    
    if (typeof message === 'string') {
      if (message.includes('Error in parsing value for') && 
          (message.includes('-webkit-text-size-adjust') || 
           message.includes('height') || 
           message.includes('min-height'))) {
        return; // Suprimir errores de parsing CSS específicos
      }
    }
    
    // Mostrar otros errores normalmente
    originalConsoleError.apply(console, args);
  };
  
  console.log('✅ Advertencias del navegador suprimidas para mejor experiencia de usuario');
})();
