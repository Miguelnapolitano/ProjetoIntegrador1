import { servicoDeletarAtendimento } from "../../servicos/atendimentos/deletar.servico.js";

export async function controladorDeletarAtendimento(req, res) {
  await servicoDeletarAtendimento(req.idAtendimento);

  res.status(204).json();
}
