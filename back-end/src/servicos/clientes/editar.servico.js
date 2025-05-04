import { AppErro } from "../../erros.js";
import prisma from "../../server.js";

export const servicoEditarCliente = async (id, body) => {
  try {
    const response = await prisma.cliente.update({
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