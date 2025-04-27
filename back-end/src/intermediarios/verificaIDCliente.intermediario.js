import prisma from '../server.js';
import { AppErro } from '../erros.js';

export const verificaIDProfissional = async (req, res, next) => {
  const idCliente = req.query.cliente;

  try {
    const cliente = await prisma.cliente.findFirst({
      where: {
        id: idCliente,
      },
    });
    if (cliente) {
        return next()
    };

    throw new AppErro("id do cliente não econtrado no banco de dados", 404);
  } catch (erro) {
    console.log(erro);

    throw new AppErro("erro interno do servidor", 500);
  }
};