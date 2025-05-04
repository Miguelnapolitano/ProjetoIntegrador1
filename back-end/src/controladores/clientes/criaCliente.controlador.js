import { servicoCriarCliente } from "../../servicos/clientes/criar.servico.js";

export const controladorCriaCliente = async (req, res) => {
  const response = await servicoCriarCliente(req.body);

  res.json(response).status(201);
};
