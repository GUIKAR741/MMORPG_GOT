/*Impotando mongodb*/
var mongo=require('mongodb');

module.exports=function () {
    var db=new mongo.db(
        'got',
        new mongo.Server(
            'localhost',//string contendo o endereco do servidor
            27017,//porta de conexao
            {}
        ),
        {}
    )
};