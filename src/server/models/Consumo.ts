import mongoose, { Document, Schema } from "mongoose";

// Interfaz para el documento de consumo
export interface IConsumo extends Document {
  usuarioId: mongoose.Types.ObjectId;
  fecha: Date;
  consumo: number; // en kWh
  costo: number; // en pesos
  dispositivo?: string;
  notas?: string;
}

// Esquema de la base de datos para consumo
const consumoSchema = new Schema<IConsumo>({
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
  consumo: {
    type: Number,
    required: true,
    min: [0, "El consumo no puede ser negativo"],
  },
  costo: {
    type: Number,
    required: true,
    min: [0, "El costo no puede ser negativo"],
  },
  dispositivo: {
    type: String,
    trim: true,
  },
  notas: {
    type: String,
    trim: true,
  },
});

// Índices para mejorar el rendimiento
consumoSchema.index({ usuarioId: 1, fecha: -1 });
consumoSchema.index({ fecha: 1 });

// Exportar el modelo
export const Consumo = mongoose.model<IConsumo>("Consumo", consumoSchema);
