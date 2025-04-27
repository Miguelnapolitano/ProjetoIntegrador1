import { servicoListaClientes } from "../../servicos/clientes/listarTodos.servicos.js"

export const controladorListaClientes = async (req, res) => {
    const clientes = await servicoListaClientes();
    
    res.json(clientes).status(200)
}
