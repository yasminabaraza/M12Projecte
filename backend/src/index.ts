import express from "express";
import dotenv from "dotenv";
import { prisma } from "./config/prisma";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.get("/test-db", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/create-user", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      username: "yasmin",
      password: "123456",
    },
  });

  res.json(user);
});

app.post("/start-game", async (req, res) => {
  try {
    const game = await prisma.game.create({
      data: {
        userId: 1,
        status: "active",
        currentRoom: "room1",
        state: {
          firstPuzzleSolved: false,
        },
      },
    });

    res.json(game);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la partida" });
  }
});

app.listen(3001, () => {
  console.log("Servidor en http://localhost:3001");
});
