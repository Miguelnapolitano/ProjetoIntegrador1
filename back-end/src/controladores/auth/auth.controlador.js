export const controladorAuth = async (req, res) => {    
    res.json({
        'idUsuario': req.idUsuario,
        'msg': 'o usuário está autenticado'
    }).status(200)
}