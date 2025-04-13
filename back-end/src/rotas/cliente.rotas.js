import express from 'express'
import { controladorListaClientes } from '../controladores/clientes/listaClientes.controlador.js'
import { verificaToken } from '../intermediarios/validaToken.intermediario.js'

const router = express.Router()

//

router.get('/', verificaToken, controladorListaClientes)

export default router