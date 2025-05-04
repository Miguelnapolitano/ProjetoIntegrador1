import { servicoCriaProfissional } from "../../servicos/profissionais/criarProfissional.servico.js";

export const controladorCriaProfissional = async (req, res) => {
  const userCriado = await servicoCriaProfissional(req.body);

  if (userCriado)
    return res
      .json({ detalhe: "Profissional criado com sucesso." })
      .status(201);

  return res
    .json({ detalhe: "Já existe um usuário com este email ou username" })
    .status(401);
};
