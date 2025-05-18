import express from "express";
import cors from "cors";
import RotasClientes from "./rotas/cliente.rotas.js";
import RotasProfissionais from "./rotas/profissional.rotas.js";
import RotaLogin from "./rotas/login.rotas.js";
import RotasAuth from "./rotas/auth.rotas.js";
import RotasAtendimento from "./rotas/atendimentos.rotas.js";
import "express-async-errors";
import { organizadorDeErros } from "./erros.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: 'https://projeto-integrador1-pi.vercel.app',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use("/profissionais", RotasProfissionais);
app.use("/auth", RotasAuth);
app.use("/login", RotaLogin);
app.use("/clientes", RotasClientes);
app.use("/atendimentos", RotasAtendimento);

app.use(organizadorDeErros);

app.listen(PORT, () => {
  console.log(`Servidor está rodando em http://localhost:${PORT}`);
});
