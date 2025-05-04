import { AppErro } from "../../erros.js";
import prisma from "../../server.js";

export const servicoCriarCliente = async (body) => {
  try {
    const response = await prisma.cliente.create({
      data: body,
    });
    return response;
  } catch (erro) {
    console.log(erro);

    throw new AppErro("erro interno do servidor", 500);
  }
};
