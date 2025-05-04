import { AppErro } from "../../erros.js";
import prisma from "../../server.js";

export async function servicoListarAtendimentos() {
  try {
    const response = await prisma.atendimento.findMany({
      select: {
        id: true,
        data: true,
        hora: true,
        cliente: {
          select: {
            nome: true,
            telefone: true
          }
        },
        profissional: {
          select: {
            username: true
          }
        }
      }
    });
    return response;
  } catch (erro) {
    console.log(erro);

    throw new AppErro("erro interno do servidor", 500);
  }
}
