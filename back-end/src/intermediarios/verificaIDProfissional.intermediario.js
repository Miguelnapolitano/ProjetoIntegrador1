import prisma from '../../src/server.js';
import { AppErro } from '../erros.js';

export const verificaIDProfissional = async (req, res, next) => {
  const idProfissional = req.query.profissional;

  try {
    const profissional = await prisma.profissional.findFirst({
      where: {
        id: idProfissional,
      },
    });
    if (profissional) {
        return next()
    };

    throw new AppErro("id do profissional não econtrado no banco de dados", 404);
  } catch (erro) {
    console.log(erro);

    throw new AppErro("erro interno do servidor", 500);
  }
};