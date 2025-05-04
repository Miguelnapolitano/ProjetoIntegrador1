import express from 'express'
import { validarRequisicao } from '../intermediarios/validarReq.intermediario.js'
import { loginSchema } from '../schemas/profissional.schema.js'
import { controladorLogin } from '../controladores/login/login.controlador.js'


const router = express.Router()

router.post('/', validarRequisicao(loginSchema), controladorLogin)

export default router