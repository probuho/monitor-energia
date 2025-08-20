import express from "express";
import { Consumo } from "../models/Consumo";
const router = express.Router();
// Obtener consumo del usuario
router.get("/usuario/:usuarioId", async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const { dias = 14 } = req.query;
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - Number(dias));
        const consumos = await Consumo.find({
            usuarioId,
            fecha: { $gte: fechaLimite }
        })
            .sort({ fecha: 1 })
            .select("-__v");
        res.json({
            success: true,
            consumos,
            total: consumos.length
        });
    }
    catch (error) {
        console.error("Error obteniendo consumo:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
});
// Agregar nuevo consumo
router.post("/", async (req, res) => {
    try {
        const { usuarioId, consumo, costo, dispositivo, notas } = req.body;
        if (!usuarioId || !consumo || !costo) {
            return res.status(400).json({
                success: false,
                message: "Usuario, consumo y costo son obligatorios"
            });
        }
        const nuevoConsumo = new Consumo({
            usuarioId,
            consumo: Number(consumo),
            costo: Number(costo),
            dispositivo,
            notas
        });
        await nuevoConsumo.save();
        res.status(201).json({
            success: true,
            message: "Consumo registrado exitosamente",
            consumo: nuevoConsumo
        });
    }
    catch (error) {
        console.error("Error registrando consumo:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
});
export default router;
