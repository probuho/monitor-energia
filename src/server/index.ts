import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import consumoRoutes from "./routes/consumo";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/monitor-energia")
  .then(() => {
    console.log(" Conectado a MongoDB");
  })
  .catch((error) => {
    console.error(" Error conectando a MongoDB:", error);
  });

app.use("/api/auth", authRoutes);
app.use("/api/consumo", consumoRoutes);

app.get("/api/health", (_, res) => {
  res.json({ message: "Servidor funcionando correctamente" });
});

app.listen(PORT, () => {
  console.log(` Servidor corriendo en puerto ${PORT}`);
});
