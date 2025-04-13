import prisma from '../../src/server.js';
import { AppErro } from '../erros.js';

export const verificaEmailOuUsername = async (req, res, next) => {
  const reqUser = req.body.user;

  try {
    const user = await prisma.profissional.findFirst({
      where: {
        OR: [{ email: reqUser }, { username: reqUser }],
      },
    });
    if (user) {
        req.idUsuario = user.idUsuario;
        return next()
    };

    throw new AppErro("usuário não econtrado", 404);
  } catch (erro) {
    console.log(erro);

    throw new AppErro("erro interno do servidor", 500);
  }
};
