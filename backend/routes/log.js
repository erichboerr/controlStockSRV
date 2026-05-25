import express from "express";
import fs from "fs";
import path from "path";
import { verificarRoot } from "../middlewares/verificarRoot.js";

const router = express.Router();
const logsDir = path.join(process.cwd(), "logs");

router.get("/logs", verificarRoot, (req, res) => {
  try {
    const files = fs.readdirSync(logsDir);
    const logs = files.map((file) => {
      const content = fs.readFileSync(path.join(logsDir, file), "utf8");
      return { file, content };
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Error al leer logs" });
  }
});

export default router;
