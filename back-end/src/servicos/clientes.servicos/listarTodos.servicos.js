import { AppErro } from '../../erros.js'
import prisma from '../../server.js'


export const servicoListaClientes = async () => {
    try {
        const clientes = await prisma.cliente.findMany();
        //só precisa parsear antes de retornar
        return clientes;
    } catch (erro) {
        console.log(erro)
        
        throw new AppErro('erro interno do servidor', 500)
    }
}
