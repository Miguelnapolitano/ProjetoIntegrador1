import { z } from "zod";

export const atendimentoSchema = z.object({
  id: z.number(),
  idCliente: z.number(),
  idProfissional: z.number(),
  data: z.string().date(),
  hora: z.string().time(),
});

export const criaAtendimentoSchema = z.object({
  data: z.string().date(),
  hora: z.string().time(),
});

export const editaAtendimentoSchema = criaAtendimentoSchema.partial();
