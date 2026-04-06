import type { Request, Response } from "express";
import { prisma } from "../db/prisma";

/**
 * Crea la primera sala de prova a la base de dades.
 * Ruta temporal només per desenvolupament.
 */
export async function seedRoom(req: Request, res: Response) {
  try {
    const existingRoom = await prisma.room.findUnique({
      where: { code: "room1" },
    });

    if (existingRoom) {
      return res.status(400).json({
        message: "La sala room1 ja existeix",
      });
    }

    const room = await prisma.room.create({
      data: {
        code: "room1",
        name: "Laboratori abandonat",
        description:
          "Una sala fosca amb ordinadors espatllats i una porta bloquejada.",
        isInitial: true,

        objects: {
          create: [
            {
              name: "Taula",
              description: "Hi ha una nota amagada sota la taula.",
              type: "note",
              action: "show-note",
            },
            {
              name: "Porta",
              description: "La porta necessita un codi de 4 dígits.",
              type: "door",
              action: "open-door",
            },
            {
              name: "Terminal",
              description: "Un terminal antic demana una contrasenya.",
              type: "terminal",
              action: "validate-code",
            },
          ],
        },

        puzzle: {
          create: {
            title: "Codi de la porta",
            statement: "Troba els números amagats a la sala.",
            solution: "4281",
            reward: "Porta desbloquejada",
          },
        },
      },
      include: {
        objects: true,
        puzzle: true,
      },
    });

    return res.status(201).json(room);
  } catch (error) {
    console.error("Error creant la sala:", error);

    return res.status(500).json({
      message: "Error intern del servidor",
    });
  }
}

/**
 * Retorna la partida activa de l'usuari autenticat.
 * - Requereix passar pel middleware authenticate (req.user definit).
 * - Si no hi ha partida activa, retorna 404 amb missatge clar.
 */
export async function getMyActiveGame(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuari no autenticat" });
    }

    const userId = Number(req.user.id);

    const game = await prisma.game.findFirst({
      where: {
        userId,
        status: "active",
      },
      orderBy: { createdAt: "desc" },
      include: {
        currentRoom: {
          include: {
            objects: true,
            puzzle: true,
          },
        },
      },
    });

    if (!game) {
      return res.status(404).json({
        message: "No s'ha trobat cap partida activa per aquest usuari",
      });
    }

    return res.status(200).json({ game });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error intern del servidor",
    });
  }
}

/**
 * Retorna l'última partida (sigui active o no).
 * Útil per mostrar historial / resume last.
 */
export async function getMyLastGame(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuari no autenticat" });
    }

    const userId = Number(req.user.id);

    const game = await prisma.game.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        currentRoom: {
          include: {
            objects: true,
            puzzle: true,
          },
        },
      },
    });

    if (!game) {
      return res.status(404).json({
        message: "No s'ha trobat cap partida per aquest usuari",
      });
    }

    return res.status(200).json({ game });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error intern del servidor",
    });
  }
}
