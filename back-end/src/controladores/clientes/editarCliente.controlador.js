import { servicoEditarCliente } from "../../servicos/clientes/editar.servico.js";

export const controladorEditaCliente = async (req, res) => {
  const response = await servicoEditarCliente(Number(req.params.id), req.body);

  return res.json(response).status(201);
};
