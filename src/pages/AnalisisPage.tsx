import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { generarDatosPrueba, ConsumoDiario } from '@/utils/recommendations';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  CheckCircle, 

  Lightbulb,
  Info
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import Tutorial from '@/components/Tutorial';
import TemporalEvolutionChart from '@/components/charts/TemporalEvolutionChart';

const AnalisisPage: React.FC = () => {
  const { usuario } = useAuth();
  const [consumos, setConsumos] = useState<ConsumoDiario[]>([]);
  const [loading, setLoading] = useState(true);
  const [periodoAnalisis, setPeriodoAnalisis] = useState('4semanas');
  const [showTutorial, setShowTutorial] = useState(false);

  // Cargar datos al montar el componente
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const datosConsumo = generarDatosPrueba();
      setConsumos(datosConsumo);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  // Función para obtener datos por semana
  const obtenerDatosPorSemana = (numSemanas: number) => {
    const semanas = [];
    const fechaActual = new Date();
    
    for (let i = 0; i < numSemanas; i++) {
      const fechaInicio = new Date(fechaActual);
      fechaInicio.setDate(fechaInicio.getDate() - (i * 7));
      const fechaFin = new Date(fechaInicio);
      fechaFin.setDate(fechaFin.getDate() + 6);
      
      const consumoSemana = consumos.filter(c => 
        c.fecha >= fechaInicio && c.fecha <= fechaFin
      );
      
      const totalSemana = consumoSemana.reduce((sum, c) => sum + c.consumo, 0);
      const costoSemana = consumoSemana.reduce((sum, c) => sum + (c.costo || 0), 0);
      
      semanas.unshift({
        numero: numSemanas - i,
        fechaInicio,
        fechaFin,
        consumo: totalSemana,
        costo: costoSemana,
        dias: consumoSemana.length,
        promedio: consumoSemana.length > 0 ? totalSemana / consumoSemana.length : 0
      });
    }
    
    return semanas;
  };

  // Obtener datos de las últimas 4 semanas
  const semanas = obtenerDatosPorSemana(4);
  
  // Calcular tendencias
  const tendenciaConsumo = semanas.length > 1 ? 
    ((semanas[semanas.length - 1].consumo - semanas[0].consumo) / semanas[0].consumo * 100) : 0;
  
  const tendenciaCosto = semanas.length > 1 ? 
    ((semanas[semanas.length - 1].costo - semanas[0].costo) / semanas[0].costo * 100) : 0;

  // Análisis de eficiencia
  const promedioGeneral = semanas.reduce((sum, s) => sum + s.promedio, 0) / semanas.length;
  const eficiencia = semanas.map(s => ({
    ...s,
    eficiencia: s.promedio <= promedioGeneral ? 'Eficiente' : 'Mejorable',
    porcentaje: (s.promedio / promedioGeneral) * 100
  }));

  // Análisis de patrones
  const patrones = {
    diaMasAlto: 'Viernes',
    diaMasBajo: 'Domingo',
    horaPico: '19:00 - 22:00',
    dispositivoPrincipal: 'Aire Acondicionado',
    ahorroPotencial: 15.5
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-lg text-muted-foreground">Analizando datos de consumo...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Encabezado principal */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Análisis Avanzado de Consumo</h1>
          <p className="text-muted-foreground">
            Análisis profundo y comparativas semanales de tu consumo energético, {usuario?.nombre}
          </p>
        </div>

        {/* Botón para activar el tutorial */}
        <div>
          <Button
            onClick={() => setShowTutorial(true)}
            className="flex items-center space-x-2"
          >
            <Info className="w-4 h-4" />
            <span>Ver Tutorial del Módulo</span>
          </Button>
        </div>

        {/* Selector de período */}
        <Card className="period-selector">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Label className="text-sm font-medium">Período de Análisis:</Label>
              <Select value={periodoAnalisis} onValueChange={setPeriodoAnalisis}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2semanas">Últimas 2 semanas</SelectItem>
                  <SelectItem value="4semanas">Últimas 4 semanas</SelectItem>
                  <SelectItem value="8semanas">Últimas 8 semanas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Resumen de tendencias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 trends-summary">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Tendencia de Consumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {tendenciaConsumo > 0 ? (
                  <TrendingUp className="w-5 h-5 text-red-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-green-600" />
                )}
                <span className={`text-2xl font-bold ${tendenciaConsumo > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {Math.abs(tendenciaConsumo).toFixed(1)}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {tendenciaConsumo > 0 ? 'Incremento' : 'Reducción'} vs. semana anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Tendencia de Costo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {tendenciaCosto > 0 ? (
                  <TrendingUp className="w-5 h-5 text-red-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-green-600" />
                )}
                <span className={`text-2xl font-bold ${tendenciaCosto > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {Math.abs(tendenciaCosto).toFixed(1)}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {tendenciaCosto > 0 ? 'Incremento' : 'Reducción'} vs. semana anterior
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Ahorro Potencial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">
                  {patrones.ahorroPotencial}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Con optimizaciones recomendadas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Análisis detallado por semanas */}
        <Tabs defaultValue="comparacion" className="w-full tabs-section">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="comparacion">Comparación Semanal</TabsTrigger>
            <TabsTrigger value="eficiencia">Análisis de Eficiencia</TabsTrigger>
            <TabsTrigger value="patrones">Patrones y Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="comparacion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Comparación Semanal Detallada</CardTitle>
                <CardDescription>
                  Análisis comparativo de consumo y costos por semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {semanas.map((semana, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">Semana {semana.numero}</h4>
                          <p className="text-sm text-muted-foreground">
                            {semana.fechaInicio.toLocaleDateString()} - {semana.fechaFin.toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={index === semanas.length - 1 ? "default" : "secondary"}>
                          {index === semanas.length - 1 ? "Actual" : "Anterior"}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">{semana.consumo.toFixed(1)}</p>
                          <p className="text-xs text-muted-foreground">kWh Total</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">${semana.costo.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground">Costo Total</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{semana.promedio.toFixed(1)}</p>
                          <p className="text-xs text-muted-foreground">Promedio Diario</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{semana.dias}</p>
                          <p className="text-xs text-muted-foreground">Días Registrados</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="eficiencia" className="space-y-4 efficiency-analysis">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Eficiencia Semanal</CardTitle>
                <CardDescription>
                  Evalúa qué tan eficiente ha sido tu consumo energético cada semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eficiencia.map((semana, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Semana {semana.numero}</h4>
                        <Badge variant={semana.eficiencia === 'Eficiente' ? 'default' : 'destructive'}>
                          {semana.eficiencia}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Eficiencia vs. Promedio General</span>
                          <span className="font-medium">{semana.porcentaje.toFixed(1)}%</span>
                        </div>
                        <Progress value={Math.min(semana.porcentaje, 100)} className="h-2" />
                        <p className="text-xs text-muted-foreground">
                          Promedio: {semana.promedio.toFixed(1)} kWh | 
                          General: {promedioGeneral.toFixed(1)} kWh
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patrones" className="space-y-4 patterns-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Patrones de Consumo</CardTitle>
                  <CardDescription>Identificación de hábitos y patrones</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Día de mayor consumo</span>
                    <Badge variant="outline">{patrones.diaMasAlto}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Día de menor consumo</span>
                    <Badge variant="outline">{patrones.diaMasBajo}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Hora pico</span>
                    <Badge variant="outline">{patrones.horaPico}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dispositivo principal</span>
                    <Badge variant="outline">{patrones.dispositivoPrincipal}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recomendaciones de Ahorro</CardTitle>
                  <CardDescription>Acciones específicas para optimizar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Optimizar horarios</p>
                      <p className="text-xs text-muted-foreground">
                        Evitar uso de AC en horas pico
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Target className="w-4 h-4 text-blue-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Establecer metas</p>
                      <p className="text-xs text-muted-foreground">
                        Reducir consumo en {patrones.diaMasAlto}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Mantener eficiencia</p>
                      <p className="text-xs text-muted-foreground">
                        Continuar buenos hábitos del {patrones.diaMasBajo}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Gráfico de tendencia temporal */}
        <Card>
          <CardHeader>
            <CardTitle>Evolución Temporal del Consumo</CardTitle>
            <CardDescription>
              Visualización de la tendencia de consumo y costos a lo largo del tiempo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TemporalEvolutionChart consumos={consumos} />
          </CardContent>
        </Card>
      </div>

      {/* Componente de tutorial interactivo */}
      <Tutorial isOpen={showTutorial} onClose={() => setShowTutorial(false)} tutorialType="analisis" />
    </DashboardLayout>
  );
};

export default AnalisisPage;
