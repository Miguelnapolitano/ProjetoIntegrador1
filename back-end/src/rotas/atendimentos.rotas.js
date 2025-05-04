import express from "express";
import { verificaToken } from "../intermediarios/validaToken.intermediario.js";
import { verificaIDProfissional } from "../intermediarios/verificaIDProfissional.intermediario.js";
import { verificaIDCliente } from "../intermediarios/verificaIDCliente.intermediario.js";
import { controladorCriarAtendimento } from "../controladores/atendimentos/criaAtendimento.controlador.js";
import { validarRequisicao } from "../intermediarios/validarReq.intermediario.js";
import {
  criaAtendimentoSchema,
  editaAtendimentoSchema,
} from "../schemas/atendimento.schema.js";
import { listarAtendimentoControlador } from "../controladores/atendimentos/listarAtendimento.controlador.js";
import { verificaAtendimento } from "../intermediarios/verificaAtendimento.intermediario.js";
import { controladorEditarAtendimento } from "../controladores/atendimentos/editaAtendimento.controlador.js";
import { controladorDeletarAtendimento } from "../controladores/atendimentos/deletaAtendimento.controlador.js";

const router = express.Router();

router.post(
  "/",
  verificaToken,
  validarRequisicao(criaAtendimentoSchema),
  verificaIDProfissional,
  verificaIDCliente,
  controladorCriarAtendimento
);

router.get("/", verificaToken, listarAtendimentoControlador);

router.patch(
  "/:id",
  verificaToken,
  verificaAtendimento,
  validarRequisicao(editaAtendimentoSchema),
  controladorEditarAtendimento
);

router.delete(
  "/:id",
  verificaToken,
  verificaAtendimento,
  controladorDeletarAtendimento
);

export default router;
