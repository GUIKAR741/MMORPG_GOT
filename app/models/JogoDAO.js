let ObjectId=require('mongodb').ObjectID;
function JogoDao(connection) {
    this._connection=connection;
}
JogoDao.prototype.GerarParametros = function(usuario) {
    let dados = {
        operacao: "inserir",
        dado: {
            usuario:usuario,
            moeda:15,
            suditos:10,
            temor:Math.floor((Math.random()*1000)+1),
            sabedoria:Math.floor((Math.random()*1000)+1),
            comercio:Math.floor((Math.random()*1000)+1),
            magia:Math.floor((Math.random()*1000)+1)
        },
        collection: "jogo",
        callback: function(err, result) {
            if(err){
                console.log(err);
            }
        }
    };
    this._connection(dados);
};
JogoDao.prototype.IniciaJogo = function(usuario,call,res,casa,msg) {
    let dados = {
        operacao: "selecionar",
        dado: {usuario:usuario},
        collection: "jogo",
        callback:call
    };
    this._connection(dados);
};
JogoDao.prototype.acao = function(usuario) {
    let dados = {
        operacao: "inserir",
        dado: usuario,
        collection: "acao",
        callback: function(err, result) {
            if(err){
                console.log(err);
            }
        }
    };
    this._connection(dados);
};
JogoDao.prototype.getAcoes = function(usuario,call,res) {
    let date=new Date();
    let momento_atual=date.getTime();
    let dados = {
        operacao: "selecionar",
        dado: {usuario:usuario,acao_termina_em:{$gt:momento_atual}},
        collection: "acao",
        callback: call
    };
    this._connection(dados);
};
JogoDao.prototype.atualizarJogo = function(dado1,dado2) {
    let dados = {
        operacao: "atualizar",
        campo: dado1,
        alterar: dado2,
        collection: "jogo",
        callback: function(err, result) {
            if(err){
                console.log(err);
            }
        }
    };
    this._connection(dados);
};
JogoDao.prototype.revogarAcao = function(_id,res) {
    let dados = {
        operacao: "deletar",
        dado: {_id:ObjectId(_id)},
        collection: "acao",
        callback: function(err, result) {
            if(err){
                console.log(err);
            }
            res.redirect("/jogo?msg=D");
        }
    };
    this._connection(dados);
};
module.exports=function () {
    return JogoDao;
};