module.exports.jogo=function (application,req,res) {
    if(!req.session.autorizado) {
        res.render("index",{validacao: [{msg:'Usuario precisa fazer login'}],dadosForm:{},comando:{}});
        return;
    }
    let msg='';
    if(req.query.msg!==''){
        msg=req.query.msg;
    }
    let connection = application.config.dbConnection;
    let jogoDAO = new application.app.models.JogoDAO(connection);
    let usuario=req.session.usuario;
    let casa=req.session.casa;
    let call = function(err, result) {
        if(err){
            console.log(err);
        }
        res.render('jogo',{img_casa:casa,jogo:result[0],msg:msg});
    };
    jogoDAO.IniciaJogo(usuario,call,res,casa,msg);
};
module.exports.sair=function (application,req,res) {
    req.session.destroy(function (err) {
        res.render("index",{validacao: {},dadosForm:{}})
    });
};
module.exports.suditos=function (application,req,res) {
    if(!req.session.autorizado) {
        res.render("index",{validacao: [{msg:'Usuario precisa fazer login'}],dadosForm:{},comando:{}});
        return;
    }
    res.render('aldeoes');
};
module.exports.pergaminhos=function (application,req,res) {
    if(!req.session.autorizado) {
        res.render("index",{validacao: [{msg:'Usuario precisa fazer login'}],dadosForm:{},comando:{}});
        return;
    }

    /* recuperar acoes inseriadas no banco de dados*/
    let connection = application.config.dbConnection;
    let jogoDAO = new application.app.models.JogoDAO(connection);
    let usuario=req.session.usuario;
    let call=function(err, result) {
        if(err){
            console.log(err);
        }
        res.render('pergaminhos',{acoes:result});
    };
    jogoDAO.getAcoes(usuario,call,res);

};
module.exports.ordenar_acao_sudito=function (application,req,res) {
    if(!req.session.autorizado) {
        res.render("index",{validacao: [{msg:'Usuario precisa fazer login'}],dadosForm:{},comando:{}});
        return;
    }
    let dados=req.body;

    req.assert('acao','Ação deve ser informada').notEmpty();
    req.assert('quantidade','Quantidade deve ser informada').notEmpty();
    let erros=req.validationErrors();
    if(erros){
        res.redirect('jogo?msg=A');
        return;
    }

    let connection = application.config.dbConnection;
    let jogoDAO = new application.app.models.JogoDAO(connection);

    dados.usuario=req.session.usuario;
    let tempo=null;
    switch (parseInt(dados.acao)){
        case 1:
            tempo=60*60*1000;
            break;
        case 2:
            tempo=2*60*60*1000;
            break;
        case 3:
            tempo=5*60*60*1000;
            break;
        case 4:
            tempo=5*60*60*1000;
            break
    }
    let moedas=null;
    switch (parseInt(dados.acao)){
        case 1:
            moedas=-2*dados.quantidade;
            break;
        case 2:
            moedas=-3*dados.quantidade;
            break;
        case 3:
            moedas=-1*dados.quantidade;
            break;
        case 4:
            moedas=-1*dados.quantidade;
            break
    }
    let date = new Date();
    dados.acao_termina_em=date.getTime()+tempo;
    jogoDAO.acao(dados);
    jogoDAO.atualizarJogo({usuario:dados.usuario},{$inc:{moeda:moedas}});
    res.redirect('jogo?msg=B');
};
module.exports.revogar_ordem=function (application,req,res) {
    if(!req.session.autorizado) {
        res.render("index",{validacao: [{msg:'Usuario precisa fazer login'}],dadosForm:{},comando:{}});
        return;
    }
    let _id=req.query.id_acao;
    let connection = application.config.dbConnection;
    let jogoDAO = new application.app.models.JogoDAO(connection);
    jogoDAO.revogarAcao(_id,res);
};