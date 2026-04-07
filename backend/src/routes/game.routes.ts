import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  getMyActiveGame,
  getMyLastGame,
  seedRoom,
  startGame,
} from "../controllers/game.controller";

const router = Router();

console.log("game.routes cargado");

// Temporal, para pruebas
router.get("/seed-room", seedRoom);

// Iniciar partida
router.post("/start", authenticate, startGame);

// Partida activa
router.get("/me/active", authenticate, getMyActiveGame);

// Última partida
router.get("/me/last", authenticate, getMyLastGame);

export default router;
