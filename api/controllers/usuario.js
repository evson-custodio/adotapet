module.exports = (api) => {
    const Generic = api.util.generic;
    const Usuario = api.models.usuario;

    let controller = Generic.getController(api, 'usuario');

    controller.authenticate = (req, res, next) => {
        Usuario.findOne({
            // password: req.headers.password,
            $or: [
                {
                    username: req.headers['username-email']
                },
                {
                    email: req.headers['username-email']
                }
            ]
        })
        .exec()
        .then(usuario => {
            if (usuario == null) {
                res.status(404).json({
                    message: 'Nome de Usuario ou E-mail não encontrados.'
                });
            }
            else if (usuario.password !== req.headers.password) {
                res.status(400).json({
                    message: 'Senha Incorreta.'
                });
            }
            else {
                res.status(200).json(usuario);
            }
        })
        .catch(error => {
            res.status(400).json(error);
        });
    }

    return controller;
}