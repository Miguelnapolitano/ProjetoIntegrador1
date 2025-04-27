import express from 'express'
import { controladorAuth } from '../controladores/auth/auth.controlador.js'
import { verificaToken } from '../intermediarios/validaToken.intermediario.js'


const router = express.Router()

router.post('/', verificaToken, controladorAuth)

export default router