import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { generarDatosPrueba, ConsumoDiario } from '@/utils/recommendations';
import ConsumptionCharts from '@/components/ConsumptionCharts';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Filter, Download, RefreshCw, TrendingUp, Activity, Zap, Info } from 'lucide-react';
import Tutorial from '@/components/Tutorial';
import DualPriceDisplay from '@/components/ui/DualPriceDisplay';

const ConsumoPage: React.FC = () => {
  const { usuario } = useAuth();
  const [consumos, setConsumos] = useState<ConsumoDiario[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroPeriodo, setFiltroPeriodo] = useState('14dias');
  const [filtroDispositivo, setFiltroDispositivo] = useState('todos');
  const [filtroFechaInicio, setFiltroFechaInicio] = useState('');
  const [filtroFechaFin, setFiltroFechaFin] = useState('');
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

  // Aplicar filtros
  const consumosFiltrados = consumos.filter(consumo => {
    if (filtroDispositivo !== 'todos' && consumo.dispositivo !== filtroDispositivo) {
      return false;
    }
    
    if (filtroFechaInicio && new Date(consumo.fecha) < new Date(filtroFechaInicio)) {
      return false;
    }
    
    if (filtroFechaFin && new Date(consumo.fecha) > new Date(filtroFechaFin)) {
      return false;
    }
    
    return true;
  });

  // Calcular estadísticas filtradas
  const consumoTotal = consumosFiltrados.reduce((sum, c) => sum + c.consumo, 0);
  const costoTotal = consumosFiltrados.reduce((sum, c) => sum + (c.costo || 0), 0);
  const promedioDiario = consumosFiltrados.length > 0 ? consumoTotal / consumosFiltrados.length : 0;
  const maximoConsumo = Math.max(...consumosFiltrados.map(c => c.consumo));
  const minimoConsumo = Math.min(...consumosFiltrados.map(c => c.consumo));

  // Función para exportar datos
  const exportarDatos = () => {
    const csvContent = [
      ['Fecha', 'Consumo (kWh)', 'Costo ($)', 'Dispositivo', 'Notas'],
      ...consumosFiltrados.map(c => [
        c.fecha.toLocaleDateString(),
        c.consumo.toString(),
        (c.costo || 0).toString(),
        c.dispositivo || 'N/A',
        c.notas || 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `consumo_energetico_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-lg text-muted-foreground">Cargando datos de consumo...</p>
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
          <h1 className="text-3xl font-bold tracking-tight">Módulo de Consumo Energético</h1>
          <p className="text-muted-foreground">
            Análisis detallado y filtrado de tu consumo energético, {usuario?.nombre}
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

        {/* Panel de filtros */}
        <Card className="filter-panel">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filtros y Controles</span>
            </CardTitle>
            <CardDescription>
              Personaliza la visualización de tus datos de consumo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Filtro de período */}
              <div className="space-y-2">
                <Label htmlFor="periodo">Período</Label>
                <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7dias">Últimos 7 días</SelectItem>
                    <SelectItem value="14dias">Últimos 14 días</SelectItem>
                    <SelectItem value="30dias">Últimos 30 días</SelectItem>
                    <SelectItem value="personalizado">Personalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro de dispositivo */}
              <div className="space-y-2">
                <Label htmlFor="dispositivo">Dispositivo</Label>
                <Select value={filtroDispositivo} onValueChange={setFiltroDispositivo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos los dispositivos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los dispositivos</SelectItem>
                    <SelectItem value="Aire Acondicionado">Aire Acondicionado</SelectItem>
                    <SelectItem value="Refrigerador">Refrigerador</SelectItem>
                    <SelectItem value="Iluminación">Iluminación</SelectItem>
                    <SelectItem value="Electrodomésticos">Electrodomésticos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro de fecha inicio */}
              <div className="space-y-2">
                <Label htmlFor="fechaInicio">Fecha Inicio</Label>
                <Input
                  type="date"
                  value={filtroFechaInicio}
                  onChange={(e) => setFiltroFechaInicio(e.target.value)}
                  disabled={filtroPeriodo !== 'personalizado'}
                />
              </div>

              {/* Filtro de fecha fin */}
              <div className="space-y-2">
                <Label htmlFor="fechaFin">Fecha Fin</Label>
                <Input
                  type="date"
                  value={filtroFechaFin}
                  onChange={(e) => setFiltroFechaFin(e.target.value)}
                  disabled={filtroPeriodo !== 'personalizado'}
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar
              </Button>
              <Button variant="outline" size="sm" onClick={exportarDatos}>
                <Download className="w-4 h-4 mr-2" />
                Exportar CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Métricas principales filtradas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 metrics-grid">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Consumo Total</p>
                  <p className="text-xl font-bold">{consumoTotal.toFixed(1)} kWh</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Costo Total</p>
                  <div className="space-y-1">
                    <p className="text-xl font-bold">${costoTotal.toFixed(2)}</p>
                    <DualPriceDisplay 
                      usdAmount={costoTotal}
                      size="sm"
                      showIcons={false}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Promedio Diario</p>
                  <p className="text-xl font-bold">{promedioDiario.toFixed(1)} kWh</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Máximo</p>
                  <p className="text-xl font-bold">{maximoConsumo.toFixed(1)} kWh</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mínimo</p>
                  <p className="text-xl font-bold">{minimoConsumo.toFixed(1)} kWh</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos detallados */}
        <div className="charts-section">
          <ConsumptionCharts consumos={consumosFiltrados} />
        </div>

        {/* Tabla de datos detallados */}
        <Card className="data-table">
          <CardHeader>
            <CardTitle>Datos Detallados de Consumo</CardTitle>
            <CardDescription>
              Registro cronológico de todas las lecturas filtradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Fecha</th>
                    <th className="text-left p-2">Consumo (kWh)</th>
                    <th className="text-left p-2">Costo ($)</th>
                    <th className="text-left p-2">Costo (VES)</th>
                    <th className="text-left p-2">Dispositivo</th>
                    <th className="text-left p-2">Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {consumosFiltrados.map((consumo, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-2">{consumo.fecha.toLocaleDateString()}</td>
                      <td className="p-2 font-medium">{consumo.consumo.toFixed(1)}</td>
                      <td className="p-2">${(consumo.costo || 0).toFixed(2)}</td>
                                             <td className="p-2 text-muted-foreground">
                         {new Intl.NumberFormat('es-VE', {
                           style: 'currency',
                           currency: 'VES',
                           minimumFractionDigits: 2
                         }).format((consumo.costo || 0) * 136.89)}
                       </td>
                      <td className="p-2">{consumo.dispositivo || 'N/A'}</td>
                      <td className="p-2 text-muted-foreground">{consumo.notas || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Componente de tutorial interactivo */}
      <Tutorial isOpen={showTutorial} onClose={() => setShowTutorial(false)} tutorialType="consumo" />
    </DashboardLayout>
  );
};

export default ConsumoPage;
