import { compare } from "bcryptjs";
import prisma from "../../server.js";
import { AppErro } from "../../erros.js";
import jwt from "jsonwebtoken";

export const servicoLogin = async (credenciais) => {
  try {
    const usuario = await prisma.profissional.findFirst({
      where: {
        OR: [{ email: credenciais.usuario }, { username: credenciais.usuario }],
      },
    });

    const senhaCorreta = await compare(credenciais.senha, usuario.senha);

    if (!senhaCorreta) {
      throw new AppErro("Credenciais inválidas", 401);
    }

    const token = jwt.sign({}, process.env.SECRET_KEY, {
      expiresIn: '24h',
      subject: String(usuario.id),
    });

    return token;
  } catch (erro) {
    console.log(erro);

    throw new AppErro("erro interno do servidor", 500);
  }
};
