import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Github, 
  Code, 
  Globe, 
  Package, 
  FileText, 
  ExternalLink,
  Terminal,
  Server,
  Monitor,
  Smartphone
} from 'lucide-react';

const InformacionPage: React.FC = () => {

  const stackTechnologies = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React 18', version: '18.2.0', description: 'Biblioteca de interfaz de usuario' },
        { name: 'TypeScript', version: '5.0+', description: 'JavaScript tipado estáticamente' },
        { name: 'Vite', version: '5.4+', description: 'Build tool y dev server' },
        { name: 'Tailwind CSS', version: '3.3+', description: 'Framework CSS utility-first' },
        { name: 'shadcn/ui', version: 'latest', description: 'Componentes UI modernos' }
      ]
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Node.js', version: '18+', description: 'Runtime de JavaScript' },
        { name: 'Express.js', version: '4.18+', description: 'Framework web para Node.js' },
        { name: 'TypeScript', version: '5.0+', description: 'Backend tipado' },
        { name: 'tsx', version: 'latest', description: 'Runtime TypeScript para Node.js' }
      ]
    },
    {
      category: 'Base de Datos',
      technologies: [
        { name: 'MongoDB', version: '6.0+', description: 'Base de datos NoSQL' },
        { name: 'Mongoose', version: '8.0+', description: 'ODM para MongoDB' }
      ]
    },
    {
      category: 'Herramientas',
      technologies: [
        { name: 'Chart.js', version: '4.4+', description: 'Gráficos interactivos' },
        { name: 'Driver.js', version: '1.3+', description: 'Tutoriales interactivos' },
        { name: 'Lucide React', version: 'latest', description: 'Iconos modernos' }
      ]
    }
  ];

  const projectStructure = [
    {
      path: 'src/',
      description: 'Código fuente principal',
      children: [
        'components/ - Componentes reutilizables',
        'pages/ - Páginas de la aplicación',
        'contexts/ - Contextos de React',
        'hooks/ - Hooks personalizados',
        'utils/ - Utilidades y helpers',
        'styles/ - Estilos CSS personalizados',
        'types/ - Definiciones de tipos TypeScript'
      ]
    },
    {
      path: 'src/components/',
      description: 'Componentes organizados por funcionalidad',
      children: [
        'ui/ - Componentes base de shadcn/ui',
        'layout/ - Componentes de layout',
        'dashboard/ - Componentes específicos del dashboard',
        'charts/ - Componentes de gráficos'
      ]
    },
    {
      path: 'src/pages/',
      description: 'Páginas principales de la aplicación',
      children: [
        'DashboardNew.tsx - Dashboard principal',
        'ConsumoPage.tsx - Módulo de consumo',
        'AnalisisPage.tsx - Módulo de análisis',
        'InformacionPage.tsx - Esta página informativa'
      ]
    }
  ];

  const features = [
    {
      title: 'Sistema de Autenticación',
      description: 'Autenticación personalizada con React Context',
      icon: Monitor
    },
    {
      title: 'Dashboard Responsivo',
      description: 'Interfaz adaptativa para todos los dispositivos',
      icon: Smartphone
    },
    {
      title: 'Monitoreo en Tiempo Real',
      description: 'Simulador de datos con actualizaciones automáticas',
      icon: Terminal
    },
    {
      title: 'Análisis Avanzado',
      description: 'Gráficos interactivos y métricas detalladas',
      icon: Code
    },
    {
      title: 'Tasas de Cambio',
      description: 'Integración con APIs de cambio de moneda',
      icon: Globe
    },
    {
      title: 'Tutoriales Interactivos',
      description: 'Guías paso a paso con Driver.js',
      icon: FileText
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Encabezado principal */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Información del Proyecto</h1>
          <p className="text-muted-foreground">
            Detalles técnicos, stack tecnológico y estructura del Monitor de Consumo Energético
          </p>
        </div>



        {/* Equipo de Desarrollo */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight">Equipo Número 2: Monitor de Consumo Energético con Sugerencias de Ahorro</h2>
            <p className="text-muted-foreground mt-2">Desarrolladores del proyecto académico</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tarjeta de Antonio */}
            <Card className="team-member-card">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">AR</span>
                </div>
                <CardTitle className="text-xl">Antonio José Ruiz Canchica</CardTitle>
                <CardDescription className="text-base font-medium text-primary">Desarrollador Full Stack</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground">Cédula:</span>
                    <span className="text-sm">V-21.346.119</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground">Correo:</span>
                    <span className="text-sm">contactoprobuho@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground">GitHub:</span>
                    <span className="text-sm font-mono text-primary">@probuho</span>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground text-center">
                    Especialista en desarrollo frontend y backend con enfoque en tecnologías modernas y experiencia en sistemas de monitoreo energético.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tarjeta de Enmanuela */}
            <Card className="team-member-card">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">EG</span>
                </div>
                <CardTitle className="text-xl">Enmanuela Gutiérrez</CardTitle>
                <CardDescription className="text-base font-medium text-primary">Desarrolladora Full Stack</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground">Cédula:</span>
                    <span className="text-sm">V-27.571.899</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground">Correo:</span>
                    <span className="text-sm">enmanuelag230100@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-muted-foreground">GitHub:</span>
                    <span className="text-sm font-mono text-primary">@enmanuela24</span>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground text-center">
                    Desarrolladora especializada en interfaces de usuario y análisis de datos, con experiencia en sistemas de monitoreo y visualización de información.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Stack Tecnológico */}
        <Card className="stack-technologies">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Stack Tecnológico</span>
            </CardTitle>
            <CardDescription>
              Tecnologías y herramientas utilizadas en el desarrollo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stackTechnologies.map((category) => (
                <div key={category.category} className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary">{category.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.technologies.map((tech) => (
                      <div key={tech.name} className="p-3 border rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{tech.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {tech.version}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{tech.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estructura del Proyecto */}
        <Card className="project-structure">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Code className="w-5 h-5" />
              <span>Estructura del Proyecto</span>
            </CardTitle>
            <CardDescription>
              Organización de directorios y archivos principales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectStructure.map((item) => (
                <div key={item.path} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm bg-primary/10 text-primary px-2 py-1 rounded">
                      {item.path}
                    </span>
                    <span className="text-sm text-muted-foreground">{item.description}</span>
                  </div>
                  <div className="ml-4 space-y-1">
                    {item.children.map((child, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span className="text-primary">•</span>
                        <span className="font-mono">{child}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Características Principales */}
        <Card className="features">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Características Principales</span>
            </CardTitle>
            <CardDescription>
              Funcionalidades implementadas en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((feature) => (
                <div key={feature.title} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <feature.icon className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">{feature.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Enlaces y Recursos */}
        <Card className="github-links">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ExternalLink className="w-5 h-5" />
              <span>Enlaces y Recursos</span>
            </CardTitle>
            <CardDescription>
              Repositorio GitHub y documentación del proyecto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Button asChild className="flex items-center space-x-2">
                  <a 
                    href="https://github.com/aruizc01/monitor-energia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    <span>Ver en GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" asChild className="flex items-center space-x-2">
                  <a 
                    href="https://github.com/aruizc01/monitor-energia/blob/main/README.md" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>README</span>
                  </a>
                </Button>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Información del Repositorio</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Nombre:</strong> monitor-energia</p>
                  <p><strong>Propietario:</strong> aruizc01</p>
                  <p><strong>Descripción:</strong> Sistema de monitoreo de consumo energético con análisis avanzado y recomendaciones</p>
                  <p><strong>Stack:</strong> MERN (MongoDB, Express, React, Node.js) + TypeScript</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Información del Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Server className="w-5 h-5" />
              <span>Información del Sistema</span>
            </CardTitle>
            <CardDescription>
              Detalles de la implementación y configuración
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium">Configuración de Desarrollo</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Puerto Frontend:</strong> 3001</p>
                  <p><strong>Puerto Backend:</strong> 5000</p>
                  <p><strong>Base de Datos:</strong> MongoDB local</p>
                  <p><strong>Modo:</strong> Desarrollo con hot reload</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Características Técnicas</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>Autenticación:</strong> Context API personalizado</p>
                  <p><strong>Rutas:</strong> React Router DOM v6</p>
                  <p><strong>Estado:</strong> React Hooks + Context</p>
                  <p><strong>Estilos:</strong> Tailwind CSS + shadcn/ui</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InformacionPage;
