import { servicoEditarAtendimento } from "../../servicos/atendimentos/editar.servico.js";

export async function controladorEditarAtendimento(req, res) {
  const response = await servicoEditarAtendimento(req.idAtendimento, req.body);

  res.json(response).status(200);
}