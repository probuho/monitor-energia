import React, { useEffect, useRef } from 'react';
import { driver, Driver } from 'driver.js';
import 'driver.js/dist/driver.css';

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
  tutorialType: 'login' | 'register' | 'dashboard';
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
              side: 'bottom',
              align: 'center'
            }
          },
          {
            element: '#email-input',
            popover: {
              title: '📧 Correo Electrónico',
              description: 'Ingresa tu correo electrónico registrado en el sistema.',
              side: 'right',
              align: 'center'
            }
          },
          {
            element: '#password-input',
            popover: {
              title: '🔒 Contraseña',
              description: 'Ingresa tu contraseña de seguridad.',
              side: 'right',
              align: 'center'
            }
          },
          {
            element: '#login-button',
            popover: {
              title: '🚀 Acceder',
              description: 'Haz clic aquí para iniciar sesión y acceder a tu dashboard personal.',
              side: 'top',
              align: 'center'
            }
          },
          {
            element: '#register-link',
            popover: {
              title: '📝 ¿No tienes cuenta?',
              description: 'Si eres nuevo usuario, haz clic aquí para crear tu cuenta y comenzar a monitorear tu consumo energético.',
              side: 'top',
              align: 'center'
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
              side: 'bottom',
              align: 'center'
            }
          },
          {
            element: '#nombre-input',
            popover: {
              title: '👤 Nombre Completo',
              description: 'Ingresa tu nombre completo para personalizar tu experiencia.',
              side: 'right',
              align: 'center'
            }
          },
          {
            element: '#email-input',
            popover: {
              title: '📧 Correo Electrónico',
              description: 'Este será tu usuario para acceder al sistema. Asegúrate de usar un correo válido.',
              side: 'right',
              align: 'center'
            }
          },
          {
            element: '#password-input',
            popover: {
              title: '🔒 Contraseña',
              description: 'Crea una contraseña segura con al menos 6 caracteres.',
              side: 'right',
              align: 'center'
            }
          },
          {
            element: '#register-button',
            popover: {
              title: '✅ Crear Cuenta',
              description: 'Haz clic aquí para crear tu cuenta y comenzar a usar el sistema.',
              side: 'top',
              align: 'center'
            }
          },
          {
            element: '#login-link',
            popover: {
              title: '🔐 ¿Ya tienes cuenta?',
              description: 'Si ya estás registrado, haz clic aquí para iniciar sesión.',
              side: 'top',
              align: 'center'
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
              side: 'bottom',
              align: 'center'
            }
          },
          {
            element: '#user-info',
            popover: {
              title: '👤 Información del Usuario',
              description: 'Aquí se muestra tu información personal y opciones de cuenta.',
              side: 'left',
              align: 'center'
            }
          },
          {
            element: '#consumption-summary',
            popover: {
              title: '📊 Resumen de Consumo',
              description: 'Vista general de tu consumo total, costo y promedio diario.',
              side: 'top',
              align: 'center'
            }
          },
          {
            element: '#recommendation-card',
            popover: {
              title: '💡 Motor de Recomendaciones',
              description: 'El sistema analiza tu consumo y te sugiere acciones para ahorrar energía.',
              side: 'left',
              align: 'center'
            }
          },
          {
            element: '#consumption-chart',
            popover: {
              title: '📈 Gráfico de Consumo',
              description: 'Visualiza la tendencia de tu consumo energético en los últimos días.',
              side: 'top',
              align: 'center'
            }
          },
          {
            element: '#logout-button',
            popover: {
              title: '🚪 Cerrar Sesión',
              description: 'Haz clic aquí cuando termines de usar el sistema.',
              side: 'bottom',
              align: 'center'
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
