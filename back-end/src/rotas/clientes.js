import express from 'express'
import { controladorListaClientes } from '../controladores/clientes.controlladores/listaClientes.controlador.js'

const router = express.Router()

router.get('/', controladorListaClientes)

export default router