import { servicoListaClientes } from "../../servicos/clientes/listarTodos.servico.js"

export const controladorListaClientes = async (req, res) => {
    const clientes = await servicoListaClientes();
    
    res.json(clientes).status(200)
}
