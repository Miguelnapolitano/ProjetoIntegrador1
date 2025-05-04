import { servicoDeletarCliente } from "../../servicos/clientes/deletar.servico.js";

export const controladorDeletaCliente = async (req, res) => {
  await servicoDeletarCliente(parseInt(req.params.id));

  return res.status(204).json()
};