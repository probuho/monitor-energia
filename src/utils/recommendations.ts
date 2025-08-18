// Motor de recomendaciones inteligente para ahorro energético
export interface ConsumoDiario {
  fecha: Date;
  consumo: number; // en kWh
  costo?: number; // en pesos
}

export interface Recomendacion {
  tipo: "ahorro" | "neutral" | "excelente";
  mensaje: string;
  porcentajeCambio: number;
  sugerencias: string[];
}

/**
 * Analiza el consumo energético y genera recomendaciones inteligentes
 * @param lecturas - Array de lecturas de consumo diario
 * @returns Recomendación personalizada con sugerencias
 */
export function generarRecomendacion(lecturas: ConsumoDiario[]): Recomendacion {
  if (lecturas.length < 7) {
    return {
      tipo: "neutral",
      mensaje: "Necesitamos más datos para generar recomendaciones precisas",
      porcentajeCambio: 0,
      sugerencias: ["Continúa registrando tu consumo diario para recibir sugerencias personalizadas"]
    };
  }

  // Obtener las últimas 7 lecturas
  const ultimas7Lecturas = lecturas.slice(-7);
  const ultimaLectura = ultimas7Lecturas[ultimas7Lecturas.length - 1];
  
  // Calcular promedio de las últimas 7 lecturas
  const promedio = ultimas7Lecturas.reduce((sum, lectura) => sum + lectura.consumo, 0) / 7;
  
  // Calcular porcentaje de cambio
  const porcentajeCambio = ((ultimaLectura.consumo - promedio) / promedio) * 100;
  
  // Generar recomendación basada en el análisis
  if (porcentajeCambio > 15) {
    return {
      tipo: "ahorro",
      mensaje: `¡Atención! Tu consumo aumentó un ${porcentajeCambio.toFixed(1)}%`,
      porcentajeCambio,
      sugerencias: [
        "Revisa electrodomésticos que puedan estar consumiendo más energía",
        "Considera usar temporizadores para dispositivos",
        "Verifica que no haya fugas de energía en tu hogar",
        "Optimiza el uso de aire acondicionado y calefacción"
      ]
    };
  } else if (porcentajeCambio < -10) {
    return {
      tipo: "excelente",
      mensaje: `¡Excelente! Tu consumo disminuyó un ${Math.abs(porcentajeCambio).toFixed(1)}%`,
      porcentajeCambio,
      sugerencias: [
        "¡Sigue así! Estás implementando buenas prácticas",
        "Considera compartir tus estrategias de ahorro",
        "Mantén el monitoreo regular de tu consumo",
        "Evalúa si puedes optimizar aún más"
      ]
    };
  } else {
    return {
      tipo: "neutral",
      mensaje: "Tu consumo se mantiene estable",
      porcentajeCambio,
      sugerencias: [
        "Continúa monitoreando tu consumo diario",
        "Considera implementar pequeñas mejoras de eficiencia",
        "Mantén tus buenos hábitos energéticos"
      ]
    };
  }
}

/**
 * Genera datos de prueba para demostración
 */
export function generarDatosPrueba(): ConsumoDiario[] {
  const hoy = new Date();
  const datos: ConsumoDiario[] = [];
  
  // Generar 30 días de datos con variación realista y patrones semanales
  for (let i = 29; i >= 0; i--) {
    const fecha = new Date(hoy);
    fecha.setDate(hoy.getDate() - i);
    
    // Patrón semanal: más consumo en fines de semana
    const diaSemana = fecha.getDay();
    const esFinDeSemana = diaSemana === 0 || diaSemana === 6;
    
    // Consumo base con variación diaria y semanal
    let consumoBase = 15; // kWh base
    
    // Ajustar por día de la semana
    if (esFinDeSemana) {
      consumoBase += 3; // Más consumo en fines de semana
    } else if (diaSemana === 1) { // Lunes
      consumoBase += 1; // Ligero aumento
    } else if (diaSemana === 5) { // Viernes
      consumoBase += 2; // Preparación para el fin de semana
    }
    
    // Variación aleatoria diaria
    const variacion = (Math.random() - 0.5) * 6; // ±3 kWh
    const consumo = Math.max(8, Math.min(28, consumoBase + variacion));
    
    // Costo basado en el consumo (tarifa simulada de $0.15/kWh)
    const costo = consumo * 0.15;
    
    // Agregar variación por dispositivo específico
    const dispositivos = ["Aire Acondicionado", "Refrigerador", "Iluminación", "Electrodomésticos", "Otros"];
    const dispositivo = dispositivos[Math.floor(Math.random() * dispositivos.length)];
    
    // Notas contextuales
    let notas = "Lectura diaria del medidor";
    if (consumo > 20) {
      notas = "Alto consumo - posible uso intensivo de AC";
    } else if (consumo < 12) {
      notas = "Bajo consumo - buen día de ahorro";
    }
    
    datos.push({
      fecha,
      consumo: Math.round(consumo * 10) / 10,
      costo: Math.round(costo * 100) / 100,
      dispositivo,
      notas
    });
  }
  
  return datos;
}
