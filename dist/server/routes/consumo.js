"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Consumo_1 = require("../models/Consumo");
const router = express_1.default.Router();
// Obtener consumo del usuario
router.get("/usuario/:usuarioId", async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const { dias = 14 } = req.query;
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - Number(dias));
        const consumos = await Consumo_1.Consumo.find({
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
        const nuevoConsumo = new Consumo_1.Consumo({
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
exports.default = router;
