import prisma from '../../src/server.js';
import { AppErro } from '../erros.js';

export const verificaAtendimento = async (req, res, next) => {
  const idAtendimento = parseInt(req.params.id);

  try {
    const atendimento = await prisma.atendimento.findFirst({
      where: {
        id: {
          equals: idAtendimento
        },
      },
    });
    if (!atendimento) {
        throw new AppErro("id do atendimento não encontrado no banco de dados", 404);
    };

    if (atendimento.profissionalId !== req.idUsuario) {
        throw new AppErro("este atendimento não é do usuário logado", 403);
    }
    req.idAtendimento = idAtendimento
    return next()
  } catch (erro) {
    console.log(erro);

    if (erro instanceof AppErro){
      return next(erro)
    }

    throw new AppErro("erro interno do servidor", 500);
  }
};