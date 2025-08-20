"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 10000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Ruta de salud
app.get("/", (_, res) => {
    res.json({
        message: "Monitor de Energía - Backend funcionando correctamente",
        timestamp: new Date().toISOString(),
        port: PORT
    });
});
app.get("/api/health", (_, res) => {
    res.json({
        message: "Servidor funcionando correctamente",
        status: "OK",
        timestamp: new Date().toISOString()
    });
});
// Ruta de prueba
app.get("/api/test", (_, res) => {
    res.json({
        message: "API funcionando",
        data: "Test exitoso"
    });
});
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
