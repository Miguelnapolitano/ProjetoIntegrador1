import { AppErro } from "../../erros.js";
import prisma from "../../server.js";

export const servicoCriaProfissional = async (body) => {
  try {
    const user = await prisma.profissional.findFirst({
      where: {
        OR: [{ email: body.email }, { username: body.username }],
      },
    });
    if (user) {
      return false;
    }

    await prisma.profissional.create({
      data: body,
    });
    return true;
  } catch (erro) {
    console.log(erro);

    throw new AppErro("erro interno do servidor", 500);
  }
};
