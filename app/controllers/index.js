module.exports.index=function (application,req,res) {
    if(!req.session.autorizado) {
        res.render('index', {validacao: {}, dadosForm: {}});
    }else{
        res.render('jogo');
    }
};
module.exports.autenticar=function (application,req,res) {
    if(!req.session.autorizado) {
    let dadosForm = req.body;
    req.assert('usuario', 'Usuario Não pode ser vazio').notEmpty();
    req.assert('senha', 'Senha Não pode ser vazio').notEmpty();
    let erros = req.validationErrors();
    if (erros){
        res.render('index', {validacao: erros,dadosForm:dadosForm});
        return;
    }
    let connection = application.config.dbConnection;
    let usuariosDAO = new application.app.models.UsuariosDAO(connection);
    usuariosDAO.autenticar(dadosForm,req,res);
    }else{
        res.render('jogo');
    }
};