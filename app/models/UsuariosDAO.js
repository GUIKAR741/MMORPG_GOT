function UsuariosDao(connection) {
    this._connection=connection;
}
UsuariosDao.prototype.inserirUsuario = function(usuario, res) {
    let dados = {
        operacao: "inserir",
        usuario: usuario,
        collection: "usuarios",
        callback: function(err, result) {
            res.send("olá Marilene");
        }
    };
    this._connection(dados);
};
module.exports=function () {
    return UsuariosDao;
};