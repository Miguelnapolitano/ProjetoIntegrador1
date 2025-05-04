import { AppErro } from "../../erros.js";
import prisma from "../../server.js";

export const servicoCriarAtendimento = async (cliente, profissional, body) => {
  try {
    const response = await prisma.atendimento.create({
      data: {
        ...body,
        clienteId: cliente,
        profissionalId: profissional,
      },
    });
    return response;
  } catch (erro) {
    console.log(erro);

    throw new AppErro("erro interno do servidor", 500);
  }
};
