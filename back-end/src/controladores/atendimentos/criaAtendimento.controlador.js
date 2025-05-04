import { servicoCriarAtendimento } from "../../servicos/atendimentos/criar.servico.js";

export async function controladorCriarAtendimento(req, res) {
  const response = await servicoCriarAtendimento(
    parseInt(req.query.cliente),
    req.idUsuario,
    req.body
  );

  res.json(response).status(201);
}
