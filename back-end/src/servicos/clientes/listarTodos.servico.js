import { AppErro } from '../../erros.js'
import { retornaVariosClientesSchema } from '../../schemas/cliente.schema.js';
import prisma from '../../server.js'


export const servicoListaClientes = async () => {
    try {
        const encontrados = await prisma.cliente.findMany({
            where: {
                ativo: true
            }
        });
        const retorno = retornaVariosClientesSchema.parse(encontrados)
        return retorno;
    } catch (erro) {
        console.log(erro)
        
        throw new AppErro('erro interno do servidor', 500)
    }
}
