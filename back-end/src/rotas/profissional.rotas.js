import express from "express";
import { encriptaSenha } from "../intermediarios/encriptaSenha.intermediario.js";
import { controladorCriaProfissional } from "../controladores/profissionais/criaProfissional.controlador.js";
import { criaProfissionalSchema } from "../schemas/profissional.schema.js";
import { validarRequisicao } from "../intermediarios/validarReq.intermediarios.js";
import { verificaEmailOuUsername } from "../intermediarios/verificaEmailOuUsername.intermediario.js";

const router = express.Router();

router.post(
  "/",
  encriptaSenha,
  validarRequisicao(criaProfissionalSchema),
  controladorCriaProfissional
);

export default router;
