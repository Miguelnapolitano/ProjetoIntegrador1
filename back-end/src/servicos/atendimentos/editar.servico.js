import { AppErro } from "../../erros.js";
import prisma from "../../server.js";

export const servicoEditarAtendimento = async (id, body) => {
  try {
    const response = await prisma.atendimento.update({
      where: {
        id: id,
      },
      data: body,
    });
    return response;
  } catch (erro) {
    console.log(erro);

    throw new AppErro("erro interno do servidor", 500);
  }
};
