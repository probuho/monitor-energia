import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ConsumoDiario } from '@/utils/recommendations';
import { Play, Square, RotateCcw, Settings, Activity, Timer, BarChart3 } from 'lucide-react';

// Props del componente simulador
interface DataSimulatorPanelProps {
  onDataUpdate: (consumos: ConsumoDiario[]) => void;
  consumosActuales: ConsumoDiario[];
}

// Componente principal del simulador de datos
const DataSimulatorPanel: React.FC<DataSimulatorPanelProps> = ({ onDataUpdate, consumosActuales }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(2000);
  const [simulationCount, setSimulationCount] = useState(0);

  // Función para generar un nuevo dato de consumo con patrones realistas
  const generarNuevoConsumo = (): ConsumoDiario => {
    const ahora = new Date();
    const hora = ahora.getHours();
    
    // Patrón de consumo por hora del día
    let consumoBase = 15; // kWh base
    
    if (hora >= 6 && hora <= 9) {
      consumoBase += 2; // Mañana - despertar
    } else if (hora >= 12 && hora <= 14) {
      consumoBase += 3; // Almuerzo - cocina
    } else if (hora >= 18 && hora <= 22) {
      consumoBase += 4; // Noche - actividades
    } else if (hora >= 23 || hora <= 5) {
      consumoBase -= 3; // Madrugada - menos consumo
    }
    
    // Variación aleatoria
    const variacion = (Math.random() - 0.5) * 4;
    const consumo = Math.max(8, Math.min(28, consumoBase + variacion));
    
    // Costo basado en el consumo
    const costo = consumo * 0.15;
    
    // Dispositivo aleatorio
    const dispositivos = ['Aire Acondicionado', 'Refrigerador', 'Iluminación', 'Electrodomésticos', 'Otros'];
    const dispositivo = dispositivos[Math.floor(Math.random() * dispositivos.length)];
    
    // Notas contextuales
    let notas = 'Lectura simulada en tiempo real';
    if (consumo > 20) {
      notas = 'Alto consumo - simulación de uso intensivo';
    } else if (consumo < 12) {
      notas = 'Bajo consumo - simulación de ahorro';
    }
    
    return {
      fecha: ahora,
      consumo: Math.round(consumo * 10) / 10,
      costo: Math.round(costo * 100) / 100,
      dispositivo,
      notas
    };
  };

  // Función para actualizar datos en tiempo real
  const actualizarDatos = () => {
    const nuevoConsumo = generarNuevoConsumo();
    const nuevosConsumos = [...consumosActuales, nuevoConsumo];
    
    // Mantener solo los últimos 30 días
    if (nuevosConsumos.length > 30) {
      nuevosConsumos.splice(0, nuevosConsumos.length - 30);
    }
    
    onDataUpdate(nuevosConsumos);
    setSimulationCount(prev => prev + 1);
  };

  // Efecto para la simulación en tiempo real
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isSimulating) {
      interval = setInterval(actualizarDatos, simulationSpeed);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSimulating, simulationSpeed, consumosActuales]);

  // Función para iniciar la simulación
  const iniciarSimulacion = () => {
    setIsSimulating(true);
    setSimulationCount(0);
  };

  // Función para detener la simulación
  const detenerSimulacion = () => {
    setIsSimulating(false);
  };

  // Función para resetear los datos
  const resetearDatos = () => {
    const datosIniciales: ConsumoDiario[] = [];
    const hoy = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() - i);
      
      const consumoBase = 15;
      const variacion = (Math.random() - 0.5) * 6;
      const consumo = Math.max(8, Math.min(28, consumoBase + variacion));
      const costo = consumo * 0.15;
      
      datosIniciales.push({
        fecha,
        consumo: Math.round(consumo * 10) / 10,
        costo: Math.round(costo * 100) / 100,
        dispositivo: 'General',
        notas: 'Datos iniciales de prueba'
      });
    }
    
    onDataUpdate(datosIniciales);
    setSimulationCount(0);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5" />
          <span>Simulador de Datos en Tiempo Real</span>
        </CardTitle>
        <CardDescription>
          Simula lecturas de consumo energético para demostrar las funcionalidades del sistema
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="control" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="control">Control</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          </TabsList>
          
          {/* Panel de Control */}
          <TabsContent value="control" className="space-y-4">
            {/* Estado de la simulación */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {isSimulating ? 'Activo' : 'Inactivo'}
                  </div>
                  <p className="text-sm text-muted-foreground">Estado</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {simulationCount}
                  </div>
                  <p className="text-sm text-muted-foreground">Datos Generados</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {simulationSpeed / 1000}s
                  </div>
                  <p className="text-sm text-muted-foreground">Intervalo</p>
                </CardContent>
              </Card>
            </div>

            {/* Controles de simulación */}
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                onClick={iniciarSimulacion}
                disabled={isSimulating}
                className="flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Iniciar Simulación</span>
              </Button>
              
              <Button
                onClick={detenerSimulacion}
                disabled={!isSimulating}
                variant="destructive"
                className="flex items-center space-x-2"
              >
                <Square className="w-4 h-4" />
                <span>Detener Simulación</span>
              </Button>
              
              <Button
                onClick={resetearDatos}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Resetear Datos</span>
              </Button>
            </div>

            {/* Configuración de velocidad */}
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <Timer className="w-4 h-4 text-muted-foreground" />
                <label className="text-sm font-medium">Velocidad de Simulación:</label>
              </div>
              <select
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                className="px-3 py-2 border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value={1000}>1 segundo</option>
                <option value={2000}>2 segundos</option>
                <option value={5000}>5 segundos</option>
                <option value={10000}>10 segundos</option>
              </select>
            </div>
          </TabsContent>
          
          {/* Panel de Estadísticas */}
          <TabsContent value="stats" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Información Técnica</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Librería de Gráficos:</span>
                      <span className="font-medium">Chart.js</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Componentes UI:</span>
                      <span className="font-medium">shadcn/ui</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patrones:</span>
                      <span className="font-medium">Realistas</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Características</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-4 h-4 text-green-500" />
                      <span>Actualización en tiempo real</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Settings className="w-4 h-4 text-blue-500" />
                      <span>Velocidad configurable</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-purple-500" />
                      <span>Patrones por hora del día</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-xs text-muted-foreground text-center p-4 bg-muted rounded-lg">
              <strong>Powered by Chart.js:</strong> Gráficos interactivos y responsivos que se actualizan 
              en tiempo real con los datos simulados
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataSimulatorPanel;
