var mongoose = require("mongoose");

//Função para instância conexão com o mongodb
function conectarMongoDB(){
    mongoose.connect('mongodb://localhost/carrefourdb', { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if(!error){
        console.log("Conectado com sucesso ao MongoDB.")
    }
    else{
        console.log("Erro ao conectar no MongoDB.")
    }
    });

    return;
}

const Avaliacao = require('./avaliacao.model');
const Sugestao = require('./sugestao.model');
const Pedido = require('./pedido.model');

module.exports.conectarMongoDB = conectarMongoDB;