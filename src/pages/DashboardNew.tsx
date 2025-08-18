import React, { useState, useEffect } from "react";

import { useAuth } from "@/contexts/AuthContext";
import { generarRecomendacion, generarDatosPrueba, ConsumoDiario, Recomendacion } from "@/utils/recommendations";
import Tutorial from "@/components/Tutorial";


import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, AlertTriangle, CheckCircle, Info, BarChart3, Activity } from "lucide-react";
import ExchangeRateDisplay from "@/components/dashboard/ExchangeRateDisplay";
import DualPriceDisplay from "@/components/ui/DualPriceDisplay";

// Componente principal del Dashboard con diseño moderno usando shadcn/ui
const Dashboard: React.FC = () => {
  const { usuario, isAuthenticated, loading: authLoading } = useAuth();
  const [consumos, setConsumos] = useState<ConsumoDiario[]>([]);
  const [recomendacion, setRecomendacion] = useState<Recomendacion | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);

  // Cargar datos de consumo y generar recomendaciones al montar el componente
  useEffect(() => {
    if (isAuthenticated && usuario) {
      // Simular carga de datos (en producción sería una llamada a la API)
      const timeoutId = setTimeout(() => {
        const datosConsumo = generarDatosPrueba();
        setConsumos(datosConsumo);
        const rec = generarRecomendacion(datosConsumo);
        setRecomendacion(rec);
        setLoading(false);
      }, 1000);

      // Timeout de seguridad para evitar loading indefinido
      const safetyTimeout = setTimeout(() => {
        if (loading) {
          console.warn('Timeout de seguridad activado - forzando carga de datos');
          const datosConsumo = generarDatosPrueba();
          setConsumos(datosConsumo);
          const rec = generarRecomendacion(datosConsumo);
          setRecomendacion(rec);
          setLoading(false);
        }
      }, 5000); // 5 segundos máximo

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(safetyTimeout);
      };
    }
  }, [isAuthenticated, usuario, loading]);

  // Mostrar pantalla de carga mientras se obtienen los datos
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg text-muted-foreground">Cargando datos de consumo...</p>
          <p className="text-sm text-muted-foreground">Preparando tu dashboard personalizado</p>
        </div>
      </div>
    );
  }



  return (
    <DashboardLayout>
      {/* Componente de tutorial interactivo */}
      <Tutorial isOpen={showTutorial} onClose={() => setShowTutorial(false)} tutorialType="dashboard" />

      <div className="space-y-6">
        {/* Encabezado principal del Dashboard */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard de Consumo Energético</h1>
          <p className="text-muted-foreground">
            Bienvenido, {usuario?.nombre}. Monitorea tu consumo energético y recibe recomendaciones personalizadas.
          </p>
        </div>

        {/* Botón para activar el tutorial */}
        <div>
          <Button
            onClick={() => setShowTutorial(true)}
            className="flex items-center space-x-2"
          >
            <Info className="w-4 h-4" />
            <span>Ver Tutorial Completo</span>
          </Button>
        </div>

        {/* Panel de métricas principales del consumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta de Consumo Total */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Consumo Total</p>
                  <p className="text-2xl font-bold">
                    {consumos.reduce((sum, c) => sum + c.consumo, 0).toFixed(1)} kWh
                  </p>
                </div>
                <div className="text-primary text-3xl">
                  <Activity className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tarjeta de Costo Total */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Costo Total</p>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">
                      ${consumos.reduce((sum, c) => sum + (c.costo || 0), 0).toFixed(2)}
                    </p>
                    <DualPriceDisplay 
                      usdAmount={consumos.reduce((sum, c) => sum + (c.costo || 0), 0)}
                      size="sm"
                      showIcons={false}
                    />
                  </div>
                </div>
                <div className="text-green-600 text-3xl">
                  <TrendingUp className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tarjeta de Promedio Diario */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Promedio Diario</p>
                  <p className="text-2xl font-bold">
                    {(consumos.reduce((sum, c) => sum + c.consumo, 0) / consumos.length).toFixed(1)} kWh
                  </p>
                </div>
                <div className="text-blue-600 text-3xl">
                  <BarChart3 className="w-8 h-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel de recomendaciones del sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {/* Iconos condicionales según el tipo de recomendación */}
              {recomendacion?.tipo === "ahorro" && <AlertTriangle className="w-5 h-5 text-destructive" />}
              {recomendacion?.tipo === "excelente" && <CheckCircle className="w-5 h-5 text-green-600" />}
              {recomendacion?.tipo === "neutral" && <Info className="w-5 h-5 text-blue-600" />}
              <span>Recomendación del Sistema</span>
            </CardTitle>
            <CardDescription>{recomendacion?.mensaje}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Lista de sugerencias específicas */}
              {recomendacion?.sugerencias.map((sugerencia, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="text-primary mt-1">•</div>
                  <p className="text-sm">{sugerencia}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Panel de tasa de cambio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ExchangeRateDisplay />
          
          {/* Tarjeta de información adicional */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Información de Monedas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Los precios se muestran en USD y VES (Bolívares)</p>
                <p>• La tasa de cambio se actualiza automáticamente</p>
                <p>• Puedes actualizar manualmente la tasa haciendo clic en el botón de refresh</p>
              </div>
            </CardContent>
          </Card>
        </div>



        {/* Tarjeta de distribución por dispositivo eliminada del dashboard para evitar redundancia.
            Disponible en el módulo de Consumo. */}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
