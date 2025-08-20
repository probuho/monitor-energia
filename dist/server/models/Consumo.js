import mongoose, { Schema } from "mongoose";
// Esquema de la base de datos para consumo
const consumoSchema = new Schema({
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
export const Consumo = mongoose.model("Consumo", consumoSchema);
