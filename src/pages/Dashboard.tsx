import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { generarRecomendacion, generarDatosPrueba, ConsumoDiario, Recomendacion } from "../utils/recommendations";

const Dashboard: React.FC = () => {
  const { usuario, logout, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [consumos, setConsumos] = useState<ConsumoDiario[]>([]);
  const [recomendacion, setRecomendacion] = useState<Recomendacion | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos de consumo y generar recomendaciones
  useEffect(() => {
    if (isAuthenticated && usuario) {
      // Simular carga de datos (en producción sería una llamada a la API)
      setTimeout(() => {
        const datosConsumo = generarDatosPrueba();
        setConsumos(datosConsumo);
        const rec = generarRecomendacion(datosConsumo);
        setRecomendacion(rec);
        setLoading(false);
      }, 1000);
    }
  }, [isAuthenticated, usuario]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Cargando datos de consumo...</div>
      </div>
    );
  }



  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Monitor de Energía
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Bienvenido, {usuario?.nombre}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          
          {/* Panel de Recomendaciones */}
          {recomendacion && (
            <div className={`p-6 rounded-lg shadow-lg ${
              recomendacion.tipo === "ahorro" ? "bg-red-50 border-l-4 border-red-500" :
              recomendacion.tipo === "excelente" ? "bg-green-50 border-l-4 border-green-500" :
              "bg-blue-50 border-l-4 border-blue-500"
            }`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {recomendacion.tipo === "ahorro" && (
                    <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  )}
                  {recomendacion.tipo === "excelente" && (
                    <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {recomendacion.tipo === "neutral" && (
                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className={`text-lg font-medium ${
                    recomendacion.tipo === "ahorro" ? "text-red-800" :
                    recomendacion.tipo === "excelente" ? "text-green-800" :
                    "text-blue-800"
                  }`}>
                    {recomendacion.mensaje}
                  </h3>
                  <div className="mt-2">
                    <ul className="list-disc list-inside space-y-1">
                      {recomendacion.sugerencias.map((sugerencia, index) => (
                        <li key={index} className={`text-sm ${
                          recomendacion.tipo === "ahorro" ? "text-red-700" :
                          recomendacion.tipo === "excelente" ? "text-green-700" :
                          "text-blue-700"
                        }`}>
                          {sugerencia}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resumen de Consumo */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Resumen de Consumo (Últimos 14 días)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-blue-600">Consumo Total</div>
                  <div className="text-2xl font-bold text-blue-900">
                    {consumos.reduce((sum, c) => sum + c.consumo, 0).toFixed(1)} kWh
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-green-600">Costo Total</div>
                  <div className="text-2xl font-bold text-green-900">
                    ${consumos.reduce((sum, c) => sum + (c.costo || 0), 0).toFixed(2)}
                  </div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-sm font-medium text-purple-600">Promedio Diario</div>
                  <div className="text-2xl font-bold text-purple-900">
                    {(consumos.reduce((sum, c) => sum + c.consumo, 0) / consumos.length).toFixed(1)} kWh
                  </div>
                </div>
              </div>

              {/* Gráfico de Consumo */}
              <div className="border-t pt-4">
                <h4 className="text-md font-medium text-gray-700 mb-3">Tendencia de Consumo</h4>
                <div className="h-32 flex items-end space-x-1">
                  {consumos.slice(-7).map((consumo, index) => {
                    const maxConsumo = Math.max(...consumos.map(c => c.consumo));
                    const altura = (consumo.consumo / maxConsumo) * 100;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className={`w-full rounded-t ${
                            recomendacion?.tipo === "ahorro" ? "bg-red-400" :
                            recomendacion?.tipo === "excelente" ? "bg-green-400" :
                            "bg-blue-400"
                          }`}
                          style={{ height: `${altura}%` }}
                        ></div>
                        <div className="text-xs text-gray-500 mt-1">
                          {consumo.fecha.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Información de Sesión */}
          <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 text-center">
                Sesión iniciada como: <span className="font-medium">{usuario?.email}</span>
              </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
