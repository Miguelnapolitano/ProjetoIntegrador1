import express from "express";
import { controladorListaClientes } from "../controladores/clientes/listaClientes.controlador.js";
import { verificaToken } from "../intermediarios/validaToken.intermediario.js";
import { controladorCriaCliente } from "../controladores/clientes/criaCliente.controlador.js";
import { clienteSchema, partialClienteSchema } from "../schemas/cliente.schema.js";
import { validarRequisicao } from "../intermediarios/validarReq.intermediario.js";
import { verificaIDCliente } from "../intermediarios/verificaIDCliente.intermediario.js";
import { controladorEditaCliente } from "../controladores/clientes/editarCliente.controlador.js";
import { controladorDeletaCliente } from "../controladores/clientes/deletaCliente.controlador.js";

const router = express.Router();

router.get("/", verificaToken, controladorListaClientes);

router.post(
  "/",
  verificaToken,
  validarRequisicao(clienteSchema),
  controladorCriaCliente
);

router.patch(
  "/:id",
  verificaToken,
  verificaIDCliente,
  validarRequisicao(partialClienteSchema),
  controladorEditaCliente
);

router.delete(
  "/:id",
  verificaToken,
  verificaIDCliente,
  controladorDeletaCliente
);

export default router;
