import prisma from "../../src/server.js";
import { AppErro } from "../erros.js";

export const verificaIDProfissional = async (req, res, next) => {
  const idProfissional =
    req.params.id ||
    req.idUsuario;

  try {
    const profissional = await prisma.profissional.findFirst({
      where: {
        id: {
          equals: parseInt(idProfissional),
        },
      },
    });
    if (profissional) {
      return next();
    }

    throw new AppErro(
      "id do profissional não encontrado no banco de dados",
      404
    );
  } catch (erro) {
    console.log(erro);

    if (erro instanceof AppErro) {
      return next(erro);
    }

    throw new AppErro("erro interno do servidor", 500);
  }
};
