import { servicoListarAtendimentos } from "../../servicos/atendimentos/listar.servico.js";

export async function listarAtendimentoControlador(req, res) {
  const atendimentos = await servicoListarAtendimentos();

  res.json(atendimentos).status(200);
}
