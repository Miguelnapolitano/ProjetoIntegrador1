import { z } from 'zod'
 
export const loginSchema = z.object({
    access: z.string().max(75),
    senha: z.string().max(100)
})