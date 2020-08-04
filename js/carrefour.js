
const request = require("request");

//Informações sobre pedidos fixa para simulação
var pedidos=[
    {pedido: "1234567", status: "em análise"},
    {pedido: "", status: "", statusPagamento: "", rastreio: ""},
    {pedido: "", status: "", statusPagamento: "", rastreio: ""},
    {pedido: "", status: "", statusPagamento: "", rastreio: ""},
    {pedido: "", status: "", statusPagamento: "", rastreio: ""},
    {pedido: "", status: "", statusPagamento: "", rastreio: ""},
    {pedido: "", status: "", statusPagamento: "", rastreio: ""}
];

//Função para efetuar consulta no site do Carrefour [workaround :-)]
function consultarItem(item){
    var promiseConsulta = new Promise((resolve, reject) => {
        var itemConsulta = item.replace(/\ /g,"%20");
        request.get({url: `https://busca.carrefour.com.br/busca?q=${itemConsulta}`, json: true, timeout: 30000}, (error, response, body) => {
            var itemFiltro = item.substring(0, item.indexOf(" "));
            if(response.statusCode === 200){
                var links = [];
                var dados = body;
                var dadosQuebrados = dados.split("<");
                var dadosFiltradosLinks = dadosQuebrados.filter(linha => linha.includes("a href=\"//www"));
                var dadosFiltradosItem = dadosFiltradosLinks.filter(linha => linha.toUpperCase().includes(itemFiltro.toUpperCase()));
                var dadosSemMarcaLink = dadosFiltradosItem.map(linha => linha.replace("a href=\"//", ""));
                var dadosComLinkItem = dadosSemMarcaLink.map(linha => linha.substring(0, linha.indexOf("\"")));
                var dadosFiltradosDuplicados = dadosComLinkItem.filter((dado, ind, self) => ind === self.indexOf(dado));
                links=dadosFiltradosDuplicados.slice(0,3);
                resolve(links);
            }
            else{
                reject();
            }
        });
    });

    //Retorna a promise da consulta
    return promiseConsulta;
}

module.exports = {consultarItem};