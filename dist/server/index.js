import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000;
app.use(cors());
app.use(express.json());
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
