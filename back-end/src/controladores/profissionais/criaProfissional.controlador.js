import { servicoCriaProfissional } from "../../servicos/profissionais/criarProfissional.servico.js";

export const controladorCriaProfissional = async (req, res) => {
    await servicoCriaProfissional(req.body);
    
    res.json({detalhe: 'Profissional criado com sucesso.'}).status(201)
}