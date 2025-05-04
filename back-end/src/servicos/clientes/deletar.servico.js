import { AppErro } from "../../erros.js";
import prisma from "../../server.js";

export const servicoDeletarCliente = async (id, body) => {
  try {
    await prisma.cliente.update({
        where: {
            id: id,
          },
          data: {
            ativo: false
          },
        });
    return;
  } catch (erro) {
    console.log(erro);

    throw new AppErro("erro interno do servidor", 500);
  }
};