import { AppErro } from '../../erros.js'
import prisma from '../../server.js'


export const servicoCriaProfissional = async (body) => {
    try {
        await prisma.profissional.create({
            data: body
        })
        return
    } catch (erro) {
        console.log(erro)
        
        throw new AppErro('erro interno do servidor ao criar profissional', 500)
    }
}