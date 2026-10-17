const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  pingInterval: 25000,
  pingTimeout: 20000
});

const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));

const players = new Map();
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

io.on("connection", (socket) => {
  const player = {
    id: socket.id,
    name: `Player-${socket.id.slice(0, 4)}`,
    x: Math.random() * 12 - 6,
    z: Math.random() * 12 - 6,
    rotation: 0,
    driving: false,
    color: ["#3b82f6", "#f97316", "#22c55e", "#e879f9", "#facc15"][Math.floor(Math.random() * 5)],
    lastUpdate: Date.now()
  };
  players.set(socket.id, player);
  socket.emit("welcome", { id: socket.id, players: [...players.values()] });
  socket.broadcast.emit("playerJoined", player);

  socket.on("setName", (name) => {
    if (typeof name !== "string") return;
    const clean = name.trim().replace(/[<>]/g, "").slice(0, 16);
    if (clean.length >= 2) {
      player.name = clean;
      io.emit("playerUpdated", player);
    }
  });

  socket.on("move", (state) => {
    if (!state || typeof state !== "object") return;
    const x = Number(state.x), z = Number(state.z), rotation = Number(state.rotation);
    if (![x, z, rotation].every(Number.isFinite)) return;
    // Basic server-side bounds validation; production games need authoritative movement/anti-cheat.
    player.x = clamp(x, -180, 180);
    player.z = clamp(z, -180, 180);
    player.rotation = rotation;
    player.driving = Boolean(state.driving);
    player.lastUpdate = Date.now();
    socket.broadcast.emit("playerMoved", player);
  });

  socket.on("disconnect", () => {
    players.delete(socket.id);
    io.emit("playerLeft", socket.id);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`City Life Online running on http://localhost:${PORT}`);
});