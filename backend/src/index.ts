import express from "express";
import dotenv from "dotenv";
import { prisma } from "./config/prisma";
import { hashPassword } from "./utils/password";
import authRouter from "./routes/auth.routes";
import gameRouter from "./routes/game.routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/game", gameRouter);

app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

app.get("/test-db", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get("/create-user", async (req, res) => {
  const passwordHash = await hashPassword("123456");

  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      username: "yasmin",
      passwordHash,
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
