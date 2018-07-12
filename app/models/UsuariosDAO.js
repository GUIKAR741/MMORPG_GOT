let cryto=require('crypto');
function UsuariosDao(connection) {
    this._connection=connection;
}
UsuariosDao.prototype.inserirUsuario = function(usuario, res) {
    usuario.senha=cryto.createHash('md5').update(usuario.senha).digest('hex');
    let dados = {
        operacao: "inserir",
        dado: usuario,
        collection: "usuarios",
        callback: function(err, result) {
            if(err){
                console.log(err);
            }
        }
    };
    this._connection(dados);
};
UsuariosDao.prototype.autenticar= function(usuario, req,res) {
    usuario.senha=cryto.createHash('md5').update(usuario.senha).digest('hex');
    let dados = {
        operacao: "selecionar",
        dado: usuario,
        collection: "usuarios",
        callback: function(err, result) {
            if(err){
                console.log(err);
            }
            if(result[0]!==undefined){
                req.session.autorizado=true;
                req.session.usuario=result[0].usuario;
                req.session.casa=result[0].casa;
            }
            if(req.session.autorizado)res.redirect("jogo");
            else res.render('index',{validacao: {},dadosForm:{}});
        }
    };
    this._connection(dados);
};
module.exports=function () {
    return UsuariosDao;
};