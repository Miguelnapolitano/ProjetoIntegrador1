import { AppErro } from "../../erros.js";
import prisma from "../../server.js";

export async function servicoDeletarAtendimento(idAtendimento) {
  try {
    await prisma.atendimento.delete({
      where: {
        id: idAtendimento,
      },
    });
    return true;
  } catch (erro) {
    console.log(erro);

    throw new AppErro("erro interno do servidor", 500);
  }
}
