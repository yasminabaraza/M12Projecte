import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";
import {
  getMyActiveGame,
  getMyLastGame,
  seedRoom,
} from "../controllers/game.controller";

const router = Router();

console.log("game.routes cargado");
/**
 * Ruta temporal para crear la primera sala de prueba
 */
router.get("/seed-room", seedRoom);

/**
 * Rutas de juego protegidas:
 * - Cal estar autenticat (JWT) per consultar la teva partida.
 */
router.get("/me/active", authenticate, getMyActiveGame);

// Última partida (activa o no)
router.get("/me/last", authenticate, getMyLastGame);

export default router;
