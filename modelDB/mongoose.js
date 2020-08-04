//API mongoose
const mongoose = require("mongoose");
const connection = require("../modelDB/connection");

//Função para inserir a avaliacao do usuário
function insertAvaliacao(dadosAvaliacao){
    var avaliacaoModel = mongoose.model("Avaliacao");
    var novaAvaliacao = new avaliacaoModel();

    novaAvaliacao.nomeUsuario = dadosAvaliacao.nomeUsuario;
    novaAvaliacao.chatId = dadosAvaliacao.chatId;
    novaAvaliacao.avaliacao = dadosAvaliacao.avaliacao;
    novaAvaliacao.data = Date.now();
    novaAvaliacao.save();
}

//Função para inserir a sugestão no usuário
function insertSugestao(dadosSugestao){
    var sugestaoModel = mongoose.model("Sugestao");
    var novaSugestao = new sugestaoModel();

    novaSugestao.nomeUsuario = dadosSugestao.nomeUsuario;
    novaSugestao.chatId = dadosSugestao.chatId;
    novaSugestao.sugestao = dadosSugestao.sugestao;
    novaSugestao.data = Date.now();
    novaSugestao.save();
}

//Função para consultar o status do pedido
function getStatusPedido(numeroPedido){
    var pedidoModel = mongoose.model("Pedido");
    var promiseConsulta = new Promise((resolve, reject) => {
        pedidoModel.findOne({pedido: numeroPedido}, (error, docs) => {
            if(!error){
                resolve(docs);
            }
            else{
                reject("erro = " + error);
            }
        });
    });
    
    //Retorna a promise da consulta
    return promiseConsulta;
}

//Função para criar massa de dados para os pedidos
function insertPedidos(){
    var pedidoModel = mongoose.model("Pedido");

    try{
        //### Pedido-1
        var novoPedido1 = new pedidoModel();
        novoPedido1.pedido = "111";
        novoPedido1.status = "Em análise";
        novoPedido1.tipoPagamento = "Cartão de crédito";
        novoPedido1.statusPagamento = "Não processado";
        novoPedido1.statusRastreio = "Sem informações";
        novoPedido1.data = Date.now();
        novoPedido1.save();
        console.log("Pedido-1 ok");

        //### Pedido-2
        var novoPedido2 = new pedidoModel();
        novoPedido2.pedido = "222";
        novoPedido2.status = "Processado";
        novoPedido2.tipoPagamento = "Boleto";
        novoPedido2.statusPagamento = "Aguardando confirmação";
        novoPedido2.statusRastreio = "Sem informações";
        novoPedido2.data = Date.now();
        novoPedido2.save();
        console.log("Pedido-2 ok");

        //### Pedido-3
        var novoPedido3 = new pedidoModel();
        novoPedido3.pedido = "333";
        novoPedido3.status = "Processado";
        novoPedido3.tipoPagamento = "Cartão de crédito";
        novoPedido3.statusPagamento = "Confirmado";
        novoPedido3.statusRastreio = "Aguardando retirada pela transportadora";
        novoPedido3.data = Date.now();
        novoPedido3.save();
        console.log("Pedido-3 ok");

        //### Pedido-4
        var novoPedido4 = new pedidoModel();
        novoPedido4.pedido = "444";
        novoPedido4.status = "Processado";
        novoPedido4.tipoPagamento = "Cartão de crédito";
        novoPedido4.statusPagamento = "Aguardando confirmação";
        novoPedido4.statusRastreio = "Sem informações";
        novoPedido4.data = Date.now();
        novoPedido4.save();
        console.log("Pedido-4 ok");

        //### Pedido-5
        var novoPedido5 = new pedidoModel();
        novoPedido5.pedido = "555";
        novoPedido5.status = "Cancelado";
        novoPedido5.tipoPagamento = "Cartão de crédito";
        novoPedido5.statusPagamento = "Recusado";
        novoPedido5.statusRastreio = "Sem informações";
        novoPedido5.data = Date.now();
        novoPedido5.save();
        console.log("Pedido-5 ok");

        //### Pedido-6
        var novoPedido6 = new pedidoModel();
        novoPedido6.pedido = "666";
        novoPedido6.status = "Confirmado";
        novoPedido6.tipoPagamento = "Boleto";
        novoPedido6.statusPagamento = "Confirmado";
        novoPedido6.statusRastreio = "Saiu para entrega ao usuário";
        novoPedido6.data = Date.now();
        novoPedido6.save();
        console.log("Pedido-6 ok");

        //### Pedido-7
        var novoPedido7= new pedidoModel();
        novoPedido7.pedido = "777";
        novoPedido7.status = "Confirmado";
        novoPedido7.tipoPagamento = "Cartão de crétido";
        novoPedido7.statusPagamento = "Confirmado";
        novoPedido7.statusRastreio = "Entregue";
        novoPedido7.data = Date.now();
        novoPedido7.save();
        console.log("Pedido-7 ok");
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {insertAvaliacao, insertSugestao, getStatusPedido, insertPedidos};