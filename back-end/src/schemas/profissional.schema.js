import { z } from 'zod';

export const criaProfissionalSchema = z.object({
    nome: z.string().max(50),
    email: z.string().max(75),
    username: z.string().max(50),
    senha: z.string().max(100),
})

export const loginSchema = z.object({
    usuario: z.string().max(75),
    senha:  z.string().max(100)
})