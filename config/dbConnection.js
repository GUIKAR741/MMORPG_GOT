/*Impotando mongodb*/
var mongo = require("mongodb").MongoClient;
var assert = require("assert");
const url = "mongodb://localhost:27017";
const dbName = "got";
var connMongoDB = function(dados) {
    mongo.connect(url,{useNewUrlParser:true}, function(err, client) {
        assert.equal(null, err);
        // console.log("Connected successfully to server");
        const db = client.db(dbName);
        query(db, dados);
        client.close();
    });
};
function query(db, dados) {
    var collection = db.collection(dados.collection);
    switch (dados.operacao) {
        case "inserir":
            collection.insertOne(dados.dado, dados.callback);
            break;
        case "selecionar":
            collection.find(dados.dado).toArray(dados.callback);
            break;
        case "atualizar":
            collection.updateOne(dados.campo, dados.alterar,dados.callback);
            break;
        case "deletar":
            collection.deleteOne(dados.dado,dados.callback);
            break;
    }
}
module.exports = function() {
    return connMongoDB;
};