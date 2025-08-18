import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, DollarSign, AlertCircle } from 'lucide-react';
import { useExchangeRate } from '@/hooks/useExchangeRate';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ExchangeRateDisplay: React.FC = () => {
  const { rate, loading, error, refetch, formatVES } = useExchangeRate();

  const handleRefresh = () => {
    refetch();
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Tasa de Cambio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-sm text-muted-foreground">Cargando...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!rate) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Tasa de Cambio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Error al cargar la tasa</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Tasa de Cambio</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="h-6 w-6 p-0"
        >
          <RefreshCw className="h-3 w-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-600" />
              <span className="text-lg font-semibold">
                1 USD = {formatVES(rate.VES)}
              </span>
            </div>
            <Badge variant={rate.isOfficial ? "default" : "secondary"} className="text-xs">
              {rate.isOfficial ? "Oficial" : "Referencia"}
            </Badge>
          </div>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Última actualización: {new Date(rate.lastUpdated).toLocaleString('es-VE')}</p>
            <p>Fuente: {rate.source}</p>
            {error && (
              <p className="text-amber-600 flex items-center space-x-1">
                <AlertCircle className="h-3 w-3" />
                <span>Usando tasa de respaldo</span>
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExchangeRateDisplay;
