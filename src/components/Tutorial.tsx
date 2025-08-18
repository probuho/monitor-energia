import React, { useEffect, useRef } from 'react';
import { driver, Driver } from 'driver.js';
import 'driver.js/dist/driver.css';

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
  tutorialType: 'login' | 'register' | 'dashboard' | 'consumo' | 'analisis' | 'informacion';
}

const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose, tutorialType }) => {
  const driverRef = useRef<Driver | null>(null);

  useEffect(() => {
    if (isOpen) {
      startTutorial();
    }
  }, [isOpen, tutorialType]);

  const startTutorial = () => {
    const steps = getTutorialSteps(tutorialType);
    
    driverRef.current = driver({
      animate: true,
      opacity: 0.7,
      padding: 10,
      allowClose: true,
      overlayClickNext: false,
      doneBtnText: 'Finalizar',
      closeBtnText: 'Cerrar',
      nextBtnText: 'Siguiente',
      prevBtnText: 'Anterior',
      showProgress: true,
      steps,
      onComplete: () => {
        onClose();
      },
      onStop: () => {
        onClose();
      }
    });

    driverRef.current.drive();
  };

  const getTutorialSteps = (type: string) => {
    switch (type) {
      case 'login':
        return [
          {
            element: '#login-title',
            popover: {
              title: '🔐 Inicio de Sesión',
              description: 'Bienvenido al Monitor de Consumo Energético. Aquí podrás acceder a tu cuenta para monitorear tu consumo eléctrico.',
              side: 'bottom' as const,
              align: 'center' as const
            }
          },
          {
            element: '#email-input',
            popover: {
              title: '📧 Correo Electrónico',
              description: 'Ingresa tu correo electrónico registrado en el sistema.',
              side: 'right' as const,
              align: 'center' as const
            }
          },
          {
            element: '#password-input',
            popover: {
              title: '🔒 Contraseña',
              description: 'Ingresa tu contraseña de seguridad.',
              side: 'right' as const,
              align: 'center' as const
            }
          },
          {
            element: '#login-button',
            popover: {
              title: '🚀 Acceder',
              description: 'Haz clic aquí para iniciar sesión y acceder a tu dashboard personal.',
              side: 'top' as const,
              align: 'center' as const
            }
          },
          {
            element: '#register-link',
            popover: {
              title: '📝 ¿No tienes cuenta?',
              description: 'Si eres nuevo usuario, haz clic aquí para crear tu cuenta y comenzar a monitorear tu consumo energético.',
              side: 'top' as const,
              align: 'center' as const
            }
          }
        ];

      case 'register':
        return [
          {
            element: '#register-title',
            popover: {
              title: '📝 Registro de Usuario',
              description: '¡Únete a nuestra comunidad! Crea tu cuenta para comenzar a monitorear tu consumo energético y recibir recomendaciones personalizadas.',
              side: 'bottom' as const,
              align: 'center' as const
            }
          },
          {
            element: '#nombre-input',
            popover: {
              title: '👤 Nombre Completo',
              description: 'Ingresa tu nombre completo para personalizar tu experiencia.',
              side: 'right' as const,
              align: 'center' as const
            }
          },
          {
            element: '#email-input',
            popover: {
              title: '📧 Correo Electrónico',
              description: 'Este será tu usuario para acceder al sistema. Asegúrate de usar un correo válido.',
              side: 'right' as const,
              align: 'center' as const
            }
          },
          {
            element: '#password-input',
            popover: {
              title: '🔒 Contraseña',
              description: 'Crea una contraseña segura con al menos 6 caracteres.',
              side: 'right' as const,
              align: 'center' as const
            }
          },
          {
            element: '#register-button',
            popover: {
              title: '✅ Crear Cuenta',
              description: 'Haz clic aquí para crear tu cuenta y comenzar a usar el sistema.',
              side: 'top' as const,
              align: 'center' as const
            }
          },
          {
            element: '#login-link',
            popover: {
              title: '🔐 ¿Ya tienes cuenta?',
              description: 'Si ya estás registrado, haz clic aquí para iniciar sesión.',
              side: 'top' as const,
              align: 'center' as const
            }
          }
        ];

      case 'dashboard':
        return [
          {
            element: '#welcome-section',
            popover: {
              title: '🎉 ¡Bienvenido al Dashboard!',
              description: 'Aquí podrás ver un resumen completo de tu consumo energético y recibir recomendaciones personalizadas.',
              side: 'bottom' as const,
              align: 'center' as const
            }
          },
          {
            element: '#user-info',
            popover: {
              title: '👤 Información del Usuario',
              description: 'Aquí se muestra tu información personal y opciones de cuenta.',
              side: 'left' as const,
              align: 'center' as const
            }
          },
          {
            element: '#consumption-summary',
            popover: {
              title: '📊 Resumen de Consumo',
              description: 'Vista general de tu consumo total, costo y promedio diario.',
              side: 'top' as const,
              align: 'center' as const
            }
          },
          {
            element: '#recommendation-card',
            popover: {
              title: '💡 Motor de Recomendaciones',
              description: 'El sistema analiza tu consumo y te sugiere acciones para ahorrar energía.',
              side: 'left' as const,
              align: 'center' as const
            }
          },
          {
            element: '#logout-button',
            popover: {
              title: '🚪 Cerrar Sesión',
              description: 'Haz clic aquí cuando termines de usar el sistema.',
              side: 'bottom' as const,
              align: 'center' as const
            }
          },
          {
            element: '#sidebar',
            popover: {
              title: '🧭 Explorar Módulos',
              description: 'Desde aquí puedes acceder a análisis detallados en "Consumo" y "Análisis", o usar el simulador de datos. Elige tu propio camino de exploración.',
              side: 'right' as const,
              align: 'center' as const
            }
          }
        ];

      case 'consumo':
        return [
          {
            element: 'h1',
            popover: {
              title: '📊 Módulo de Consumo Energético',
              description: 'Análisis detallado y filtrado de tu consumo energético con gráficos y estadísticas avanzadas.',
              side: 'bottom' as const,
              align: 'center' as const
            }
          },
          {
            element: '.filter-panel',
            popover: {
              title: '🔍 Panel de Filtros',
              description: 'Personaliza la visualización de tus datos con filtros por período, dispositivo y fechas personalizadas.',
              side: 'top' as const,
              align: 'center' as const
            }
          },
          {
            element: '.metrics-grid',
            popover: {
              title: '📈 Métricas Principales',
              description: 'Vista rápida de tus indicadores clave: consumo total, costo, promedio, máximo y mínimo.',
              side: 'top' as const,
              align: 'center' as const
            }
          },
          {
            element: '.charts-section',
            popover: {
              title: '📊 Gráficos Detallados',
              description: 'Visualizaciones avanzadas de tendencias, comparaciones semanales y distribución por dispositivos.',
              side: 'left' as const,
              align: 'center' as const
            }
          },
          {
            element: '.data-table',
            popover: {
              title: '📋 Tabla de Datos',
              description: 'Registro cronológico detallado de todas tus lecturas con opción de exportación a CSV.',
              side: 'top' as const,
              align: 'center' as const
            }
          }
        ];

      case 'analisis':
        return [
          {
            element: 'h1',
            popover: {
              title: '🔬 Análisis Avanzado de Consumo',
              description: 'Análisis profundo y comparativas semanales para optimizar tu eficiencia energética.',
              side: 'bottom' as const,
              align: 'center' as const
            }
          },
          {
            element: '.period-selector',
            popover: {
              title: '📅 Selector de Período',
              description: 'Elige entre 2, 4 u 8 semanas para tu análisis comparativo.',
              side: 'top' as const,
              align: 'center' as const
            }
          },
          {
            element: '.trends-summary',
            popover: {
              title: '📊 Resumen de Tendencias',
              description: 'Indicadores clave de tendencias de consumo, costo y ahorro potencial.',
              side: 'top' as const,
              align: 'center' as const
            }
          },
          {
            element: '.tabs-section',
            popover: {
              title: '📑 Análisis Organizado',
              description: 'Navega entre comparación semanal, análisis de eficiencia y patrones de consumo.',
              side: 'top' as const,
              align: 'center' as const
            }
          },
          {
            element: '.efficiency-analysis',
            popover: {
              title: '🎯 Análisis de Eficiencia',
              description: 'Evalúa qué tan eficiente ha sido tu consumo energético cada semana.',
              side: 'left' as const,
              align: 'center' as const
            }
          },
          {
            element: '.patterns-section',
            popover: {
              title: '🔍 Patrones y Insights',
              description: 'Identificación de hábitos y recomendaciones específicas para optimizar tu consumo.',
              side: 'right' as const,
              align: 'center' as const
            }
                     }
         ];

       case 'informacion':
         return [
           {
             element: 'h1',
             popover: {
               title: '📋 Información del Proyecto',
               description: 'Detalles técnicos, stack tecnológico y estructura del sistema de monitoreo energético.',
               side: 'bottom' as const,
               align: 'center' as const
             }
           },
           {
             element: '.stack-technologies',
             popover: {
               title: '🛠️ Stack Tecnológico',
               description: 'Revisa todas las tecnologías y herramientas utilizadas en el desarrollo del proyecto.',
               side: 'top' as const,
               align: 'center' as const
             }
           },
           {
             element: '.project-structure',
             popover: {
               title: '📁 Estructura del Proyecto',
               description: 'Organización de directorios y archivos principales del código fuente.',
               side: 'left' as const,
               align: 'center' as const
             }
           },
           {
             element: '.features',
             popover: {
               title: '✨ Características Principales',
               description: 'Funcionalidades implementadas y características del sistema.',
               side: 'top' as const,
               align: 'center' as const
             }
           },
           {
             element: '.github-links',
             popover: {
               title: '🔗 Enlaces y Recursos',
               description: 'Accede al repositorio GitHub y documentación del proyecto.',
               side: 'right' as const,
               align: 'center' as const
             }
           }
         ];

       default:
         return [];
     }
  };

  useEffect(() => {
    return () => {
      if (driverRef.current) {
        driverRef.current.destroy();
      }
    };
  }, []);

  return null; // Este componente no renderiza nada visualmente
};

export default Tutorial;
