module.exports.cadastro=function (application,req,res) {
    res.render('cadastro',{validacao:{},dadosForm:{}});
};
module.exports.cadastrar=function (application,req,res) {
    let dados = req.body;
    req.assert('nome','Nome não pode ser vazio').notEmpty();
    req.assert('usuario','Usuario não pode ser vazio').notEmpty();
    req.assert('senha','Senha não pode ser vazio').notEmpty();
    req.assert('casa','Casa não pode ser vazio').notEmpty();
    let erros = req.validationErrors();

    if(erros){
        res.render('cadastro',{validacao:erros,dadosForm:dados});
        return;
    }
    let connection = application.config.dbConnection;
    let usuariosDAO = new application.app.models.UsuariosDAO(connection);
    usuariosDAO.inserirUsuario(dados,res);

    res.send('podemos cadastrar');
};