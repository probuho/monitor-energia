import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { ConsumoDiario } from '../utils/recommendations';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface ConsumptionChartsProps {
  consumos: ConsumoDiario[];
}

const ConsumptionCharts: React.FC<ConsumptionChartsProps> = ({ consumos }) => {
  // Generar datos para los últimos 14 días
  const ultimos14Dias = consumos.slice(-14);
  
  // Datos para el gráfico de línea (tendencia de consumo)
  const lineChartData = {
    labels: ultimos14Dias.map(c => 
      c.fecha.toLocaleDateString('es-ES', { 
        day: '2-digit', 
        month: 'short' 
      })
    ),
    datasets: [
      {
        label: 'Consumo Diario (kWh)',
        data: ultimos14Dias.map(c => c.consumo),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'Costo Diario ($)',
        data: ultimos14Dias.map(c => c.costo || 0),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
        fill: false,
        pointBackgroundColor: 'rgb(34, 197, 94)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        yAxisID: 'y1',
      }
    ]
  };

  // Datos para el gráfico de barras (comparación semanal)
  const ultimaSemana = consumos.slice(-7);
  const semanaAnterior = consumos.slice(-14, -7);
  
  const barChartData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
    datasets: [
      {
        label: 'Esta Semana',
        data: ultimaSemana.map(c => c.consumo),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Semana Anterior',
        data: semanaAnterior.map(c => c.consumo),
        backgroundColor: 'rgba(156, 163, 175, 0.6)',
        borderColor: 'rgb(156, 163, 175)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }
    ]
  };

  // Datos para el gráfico de dona (distribución por dispositivo)
  const dispositivos = ['Aire Acondicionado', 'Refrigerador', 'Iluminación', 'Electrodomésticos', 'Otros'];
  const consumoPorDispositivo = [35, 25, 20, 15, 5]; // Porcentajes simulados
  
  const doughnutChartData = {
    labels: dispositivos,
    datasets: [
      {
        data: consumoPorDispositivo,
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',    // Rojo para AC
          'rgba(59, 130, 246, 0.8)',   // Azul para Refrigerador
          'rgba(245, 158, 11, 0.8)',   // Amarillo para Iluminación
          'rgba(34, 197, 94, 0.8)',    // Verde para Electrodomésticos
          'rgba(156, 163, 175, 0.8)',  // Gris para Otros
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(59, 130, 246)',
          'rgb(245, 158, 11)',
          'rgb(34, 197, 94)',
          'rgb(156, 163, 175)',
        ],
        borderWidth: 3,
        hoverOffset: 4,
      }
    ]
  };

  // Configuración común para los gráficos
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '600'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(59, 130, 246, 0.5)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        padding: 12,
      }
    }
  };

  // Configuración específica para el gráfico de línea
  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Consumo (kWh)',
          color: '#6b7280',
          font: { size: 12, weight: '600' }
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: { size: 11 }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Costo ($)',
          color: '#6b7280',
          font: { size: 12, weight: '600' }
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#6b7280',
          font: { size: 11 }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Fecha',
          color: '#6b7280',
          font: { size: 12, weight: '600' }
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: { size: 11 }
        }
      }
    }
  };

  // Configuración específica para el gráfico de barras
  const barChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        title: {
          display: true,
          text: 'Consumo (kWh)',
          color: '#6b7280',
          font: { size: 12, weight: '600' }
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: { size: 11 }
        }
      },
      x: {
        title: {
          display: true,
          text: 'Día de la Semana',
          color: '#6b7280',
          font: { size: 12, weight: '600' }
        },
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: { size: 11 }
        }
      }
    }
  };

  // Configuración específica para el gráfico de dona
  const doughnutChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      legend: {
        position: 'bottom' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: { size: 11, weight: '500' }
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Gráfico de Línea - Tendencia de Consumo */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📈 Tendencia de Consumo (Últimos 14 días)
        </h3>
        <div className="h-80">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
        <p className="text-sm text-gray-600 mt-3 text-center">
          Muestra la evolución del consumo energético y costo diario
        </p>
      </div>

      {/* Gráfico de Barras - Comparación Semanal */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          📊 Comparación Semanal de Consumo
        </h3>
        <div className="h-80">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
        <p className="text-sm text-gray-600 mt-3 text-center">
          Compara el consumo de esta semana con la anterior
        </p>
      </div>

      {/* Gráfico de Dona - Distribución por Dispositivo */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          🍩 Distribución del Consumo por Dispositivo
        </h3>
        <div className="h-80 flex items-center justify-center">
          <div className="w-64 h-64">
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-3 text-center">
          Visualiza qué dispositivos consumen más energía
        </p>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Consumo Promedio</p>
              <p className="text-2xl font-bold text-blue-900">
                {(ultimos14Dias.reduce((sum, c) => sum + c.consumo, 0) / ultimos14Dias.length).toFixed(1)} kWh
              </p>
            </div>
            <div className="text-blue-500 text-3xl">⚡</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Costo Promedio</p>
              <p className="text-2xl font-bold text-green-900">
                ${(ultimos14Dias.reduce((sum, c) => sum + (c.costo || 0), 0) / ultimos14Dias.length).toFixed(2)}
              </p>
            </div>
            <div className="text-green-500 text-3xl">💰</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Días Monitoreados</p>
              <p className="text-2xl font-bold text-purple-900">
                {ultimos14Dias.length} días
              </p>
            </div>
            <div className="text-purple-500 text-3xl">📅</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionCharts;
