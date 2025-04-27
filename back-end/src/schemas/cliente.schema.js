import { z } from 'zod'

export const clienteSchema = z.object({
    nome: z.string().max(50),
    email: z.string().max(50),
    telefone: z.string().max(11)
})

export const retornaVariosClientesSchema = clienteSchema.extend({
    id: z.number(),
    ativo: z.boolean()
}).array()