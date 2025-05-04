import jwt from "jsonwebtoken";
import { AppErro } from "../erros.js";

export const verificaToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) throw new AppErro("Esqueceu do token", 401);

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (erro, decodificado) => {
      if (erro) {
        throw new AppErro(erro.message, 403);
      }

      req.idUsuario = parseInt(decodificado.sub);

      return next();
    });
  } catch (erro) {
    console.log(erro);

    if (erro instanceof AppErro) {
      return next(erro);
    }

    throw new AppErro("erro interno do servidor", 500);
  }
};
