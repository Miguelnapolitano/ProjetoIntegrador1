const express = require("express");
const db = require("./db");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar usuários");
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando em http://localhost:${PORT}`);
});
