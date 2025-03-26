import express from 'express'
import clientesRouter from './rotas/clientes.js'
import { organizadorErros } from './erros.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/clientes', clientesRouter)


app.use(organizadorErros)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})