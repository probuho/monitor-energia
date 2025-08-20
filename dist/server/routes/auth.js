import express from "express";
import bcrypt from "bcryptjs";
import { Usuario } from "../models/Usuario";
const router = express.Router();
// Ruta para registrar un nuevo usuario
router.post("/registro", async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        // Validar que todos los campos estén presentes
        if (!nombre || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios",
            });
        }
        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({
                success: false,
                message: "El email ya está registrado",
            });
        }
        // Hashear la contraseña
        const saltRounds = 12;
        const passwordHasheada = await bcrypt.hash(password, saltRounds);
        // Crear el nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: passwordHasheada,
        });
        // Guardar en la base de datos
        await nuevoUsuario.save();
        // Responder sin enviar la contraseña
        const { password: _, ...usuarioSinPassword } = nuevoUsuario.toObject();
        res.status(201).json({
            success: true,
            message: "Usuario registrado exitosamente",
            usuario: usuarioSinPassword,
        });
    }
    catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
        });
    }
});
// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validar campos
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email y contraseña son obligatorios",
            });
        }
        // Buscar usuario por email
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: "Credenciales inválidas",
            });
        }
        // Verificar contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({
                success: false,
                message: "Credenciales inválidas",
            });
        }
        // Actualizar último acceso
        usuario.ultimoAcceso = new Date();
        await usuario.save();
        // Responder sin enviar la contraseña
        const { password: _, ...usuarioSinPassword } = usuario.toObject();
        res.json({
            success: true,
            message: "Inicio de sesión exitoso",
            usuario: usuarioSinPassword,
        });
    }
    catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
        });
    }
});
// Ruta para obtener perfil del usuario (protegida)
router.get("/perfil", async (req, res) => {
    try {
        // En una implementación real, aquí verificarías el token JWT
        // Por ahora, simulamos que el usuario está autenticado
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email requerido",
            });
        }
        const usuario = await Usuario.findOne({ email }).select("-password");
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado",
            });
        }
        res.json({
            success: true,
            usuario,
        });
    }
    catch (error) {
        console.error("Error obteniendo perfil:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
        });
    }
});
// RUTAS PARA NEXTAUTH.JS
// Ruta para obtener la sesión
router.get("/session", async (_, res) => {
    try {
        // Por ahora, devolvemos una sesión vacía
        // En una implementación real, verificarías el token JWT
        res.json({
            user: null,
            expires: null,
        });
    }
    catch (error) {
        console.error("Error obteniendo sesión:", error);
        res.status(500).json({
            error: "Error interno del servidor",
        });
    }
});
// Ruta para el logging interno de NextAuth.js
router.post("/_log", async (_, res) => {
    try {
        // Log de NextAuth.js - solo respondemos OK
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error("Error en logging:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
// Ruta para manejar errores de autenticación
router.get("/error", async (req, res) => {
    try {
        const { error } = req.query;
        res.json({
            error: error || "Error de autenticación desconocido",
        });
    }
    catch (error) {
        console.error("Error en error handler:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});
export default router;
