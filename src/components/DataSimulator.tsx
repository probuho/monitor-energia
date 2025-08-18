import React, { useState, useEffect } from 'react';
import { ConsumoDiario } from '../utils/recommendations';

interface DataSimulatorProps {
  onDataUpdate: (consumos: ConsumoDiario[]) => void;
  consumosActuales: ConsumoDiario[];
}

const DataSimulator: React.FC<DataSimulatorProps> = ({ onDataUpdate, consumosActuales }) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(2000); // 2 segundos
  const [simulationCount, setSimulationCount] = useState(0);

  // Función para generar un nuevo dato de consumo
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
    const variacion = (Math.random() - 0.5) * 4; // ±2 kWh
    const consumo = Math.max(8, Math.max(28, consumoBase + variacion));
    
    // Costo
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

  const iniciarSimulacion = () => {
    setIsSimulating(true);
    setSimulationCount(0);
  };

  const detenerSimulacion = () => {
    setIsSimulating(false);
  };

  const resetearDatos = () => {
    // Generar datos iniciales de prueba
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
    <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-dashed border-indigo-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">
          🚀 Simulador de Datos en Tiempo Real
        </h3>
        <p className="text-gray-600">
          Simula lecturas de consumo energético para demostrar las funcionalidades del sistema
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">
            {isSimulating ? '🟢' : '🔴'}
          </div>
          <div className="text-sm text-gray-600">
            {isSimulating ? 'Simulando' : 'Detenido'}
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {simulationCount}
          </div>
          <div className="text-sm text-gray-600">
            Datos Generados
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {simulationSpeed / 1000}s
          </div>
          <div className="text-sm text-gray-600">
            Intervalo
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={iniciarSimulacion}
          disabled={isSimulating}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ▶️ Iniciar Simulación
        </button>
        
        <button
          onClick={detenerSimulacion}
          disabled={!isSimulating}
          className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ⏹️ Detener Simulación
        </button>
        
        <button
          onClick={resetearDatos}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          🔄 Resetear Datos
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Velocidad de Simulación:
          </label>
          <select
            value={simulationSpeed}
            onChange={(e) => setSimulationSpeed(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={1000}>1 segundo</option>
            <option value={2000}>2 segundos</option>
            <option value={5000}>5 segundos</option>
            <option value={10000}>10 segundos</option>
          </select>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          💡 <strong>Powered by Chart.js:</strong> Gráficos interactivos y responsivos que se actualizan 
          en tiempo real con los datos simulados
        </div>
      </div>
    </div>
  );
};

export default DataSimulator;
