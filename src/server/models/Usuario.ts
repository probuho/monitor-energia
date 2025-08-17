import mongoose, { Document, Schema } from 'mongoose';

// Interfaz para el documento de usuario
export interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string;
  fechaCreacion: Date;
  ultimoAcceso?: Date;
}

// Esquema de la base de datos
const usuarioSchema = new Schema<IUsuario>({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  ultimoAcceso: {
    type: Date,
    default: Date.now
  }
});

// Índices para mejorar el rendimiento
usuarioSchema.index({ fechaCreacion: -1 });

// Método para actualizar último acceso
usuarioSchema.methods.actualizarUltimoAcceso = function() {
  this.ultimoAcceso = new Date();
  return this.save();
};

// Exportar el modelo
export const Usuario = mongoose.model<IUsuario>('Usuario', usuarioSchema);
