import { servicoLogin } from "../../servicos/login/login.servico.js";

export const controladorLogin = async (req, res) => {
  const token = await servicoLogin(req.body);

  res
    .json({
      acesso: token,
    })
    .status(201);
};
