import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Activity,
  Zap,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useExchangeRate } from '@/hooks/useExchangeRate';

interface SidebarSimulatorProps {
  onDataUpdate: (consumos: any[]) => void;
  consumosActuales: any[];
}

const SidebarSimulator: React.FC<SidebarSimulatorProps> = ({ 
  onDataUpdate, 
  consumosActuales 
}) => {
  const { rate, formatVES } = useExchangeRate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [interval, setInterval] = useState(2);
  const [dataGenerated, setDataGenerated] = useState(0);
  const [simulationStats, setSimulationStats] = useState({
    totalConsumo: 0,
    totalCosto: 0,
    promedioDiario: 0,
    maximoConsumo: 0,
    minimoConsumo: 0
  });

  // Función para generar datos simulados
  const generarDatoSimulado = useCallback(() => {
    const fecha = new Date();
    const consumo = Math.random() * 20 + 10; // Entre 10-30 kWh
    const costo = consumo * 0.15; // $0.15 por kWh
    
    return {
      fecha,
      consumo: parseFloat(consumo.toFixed(1)),
      costo: parseFloat(costo.toFixed(2)),
      dispositivo: ['Aire Acondicionado', 'Refrigerador', 'Iluminación', 'Electrodomésticos'][Math.floor(Math.random() * 4)],
      notas: 'Dato simulado en tiempo real'
    };
  }, []);

  // Efecto para la simulación en tiempo real
  useEffect(() => {
    let intervalId: number;
    
    if (isActive) {
      intervalId = window.setInterval(() => {
        const nuevoDato = generarDatoSimulado();
        setDataGenerated(prev => prev + 1);
        
        // Actualizar estadísticas
        setSimulationStats(prev => {
          const nuevoTotalConsumo = prev.totalConsumo + nuevoDato.consumo;
          const nuevoTotalCosto = prev.totalCosto + nuevoDato.costo;
          const nuevoPromedio = nuevoTotalConsumo / (dataGenerated + 1);
          const nuevoMaximo = Math.max(prev.maximoConsumo, nuevoDato.consumo);
          const nuevoMinimo = prev.minimoConsumo === 0 ? nuevoDato.consumo : Math.min(prev.minimoConsumo, nuevoDato.consumo);
          
          return {
            totalConsumo: nuevoTotalConsumo,
            totalCosto: nuevoTotalCosto,
            promedioDiario: nuevoPromedio,
            maximoConsumo: nuevoMaximo,
            minimoConsumo: nuevoMinimo
          };
        });
        
        // Notificar al componente padre
        onDataUpdate([...consumosActuales, nuevoDato]);
      }, interval * 1000);
    }

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [isActive, interval, dataGenerated, consumosActuales, onDataUpdate, generarDatoSimulado]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSimulation = () => {
    setIsActive(!isActive);
    if (!isActive) {
      // Iniciar simulación
      setDataGenerated(prev => prev + 1);
    }
  };

  const resetSimulation = () => {
    setIsActive(false);
    setDataGenerated(0);
    setSimulationStats({
      totalConsumo: 0,
      totalCosto: 0,
      promedioDiario: 0,
      maximoConsumo: 0,
      minimoConsumo: 0
    });
  };

  const changeInterval = () => {
    const newInterval = interval === 2 ? 5 : interval === 5 ? 10 : 2;
    setInterval(newInterval);
  };

  return (
    <div className="border-t border-border bg-gradient-to-b from-amber-50/50 to-orange-50/50">
      {/* Header del simulador con color distintivo */}
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-amber-100/50 transition-colors"
        onClick={toggleExpansion}
      >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-semibold text-amber-800">Simulador</span>
            <p className="text-xs text-amber-600">Datos en Tiempo Real</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant={isActive ? "default" : "secondary"} 
            className={`text-xs ${isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-200 text-amber-800 hover:bg-amber-300'}`}
          >
            {isActive ? "Activo" : "Espera"}
          </Badge>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-amber-600" />
          ) : (
            <ChevronDown className="w-4 h-4 text-amber-600" />
          )}
        </div>
      </div>

      {/* Contenido expandible */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-4">
          <Separator className="bg-amber-200" />
          
          {/* Estado de la simulación */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-amber-100/70 rounded-lg border border-amber-200">
              <p className="font-medium text-amber-800 text-xs">Estado</p>
              <Badge 
                variant={isActive ? "default" : "secondary"} 
                className={`text-xs mt-1 ${isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-amber-300 text-amber-800 hover:bg-amber-400'}`}
              >
                {isActive ? "Activo" : "Espera"}
              </Badge>
            </div>
            <div className="text-center p-3 bg-amber-100/70 rounded-lg border border-amber-200">
              <p className="font-medium text-amber-800 text-xs">Datos</p>
              <p className="text-amber-700 font-bold text-lg">{dataGenerated}</p>
            </div>
          </div>

          {/* Controles principales */}
          <div className="space-y-2">
            <Button 
              size="sm" 
              variant={isActive ? "destructive" : "default"}
              className={`w-full ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-amber-500 hover:bg-amber-600'}`}
              onClick={toggleSimulation}
            >
              {isActive ? (
                <>
                  <Pause className="w-3 h-3 mr-1" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 mr-1" />
                  Iniciar
                </>
              )}
            </Button>
            
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
              onClick={resetSimulation}
            >
              <RotateCcw className="w-3 h-3 mr-1" />
              Reiniciar
            </Button>
          </div>

          {/* Configuración del intervalo */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-amber-700 font-medium">Intervalo</span>
              <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">
                {interval}s
              </Badge>
            </div>
            <Button 
              size="sm" 
              variant="ghost" 
              className="w-full text-xs text-amber-700 hover:bg-amber-100/50"
              onClick={changeInterval}
            >
              <Settings className="w-3 h-3 mr-1" />
              Cambiar: {interval === 2 ? '5s' : interval === 5 ? '10s' : '2s'}
            </Button>
          </div>

          {/* Estadísticas de la simulación */}
          <Tabs defaultValue="control" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-amber-100/50">
              <TabsTrigger value="control" className="text-amber-700 data-[state=active]:bg-amber-200">Control</TabsTrigger>
              <TabsTrigger value="stats" className="text-amber-700 data-[state=active]:bg-amber-200">Estadísticas</TabsTrigger>
            </TabsList>

            <TabsContent value="control" className="space-y-2 mt-3">
              <div className="text-xs text-amber-700 space-y-2">
                <div className="flex items-center space-x-2">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>Simula lecturas en tiempo real</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3 text-amber-500" />
                  <span>Intervalo configurable</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-3 h-3 text-amber-500" />
                  <span>Datos para demostración</span>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-2 mt-3">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-amber-700">Total Consumo:</span>
                  <span className="font-medium text-amber-800">{simulationStats.totalConsumo.toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Total Costo:</span>
                  <div className="text-right">
                    <div className="font-medium text-amber-800">${simulationStats.totalCosto.toFixed(2)}</div>
                    {rate && (
                      <div className="text-xs text-amber-600">
                        {formatVES(simulationStats.totalCosto)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Promedio:</span>
                  <span className="font-medium text-amber-800">{simulationStats.promedioDiario.toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Máximo:</span>
                  <span className="font-medium text-amber-800">{simulationStats.maximoConsumo.toFixed(1)} kWh</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Mínimo:</span>
                  <span className="font-medium text-amber-800">{simulationStats.minimoConsumo.toFixed(1)} kWh</span>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default SidebarSimulator;
