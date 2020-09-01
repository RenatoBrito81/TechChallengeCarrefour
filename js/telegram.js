//API dotenv
const configuracao = require("dotenv").config();

//Determina os tokens e credenciais do telegram
const token_telegram = process.env.TOKEN_TELEGRAM || "TODO: YOUR TELEGRAM TOKEN";

//API do telegram
const TelegramBot = require("node-telegram-bot-api");

//API do dialogflow
const dialogFlow = require("./dialogFlow");

//Instância API do telegram
const bot = new TelegramBot(token_telegram, {polling: true});

//Armazena o retorno dos usuários das opções
var answerCallbacks = {};

//Instância consulta ao site do Carrefour
var carrefour = require("./carrefour");

//Instância API do mongoose
var mongoose = require("../modelDB/mongoose");

//Função para interfaceamento com o telegram
function chatBotTelegram(){
    //Mostra erro no polling
    bot.on("polling_error", console.log);

    //Inicio do chat com o usuário
    bot.onText(/\/start/, (msg, match) => {
        bot.sendMessage(msg.chat.id, "Olá. Bem vindo ao Carrefour!!! Como posso te ajudar hoje?", {
            reply_markup:{
                resize_keyboard: true,
                one_time_keyboard: false,
                keyboard: [["Mostrar opções..."]]
            }
        });
        return;
    });

    //Armaze o retorno do usuário a opção selecionada
    bot.on("message", (msg) => {
        var callback = answerCallbacks[msg.chat.id];

        if (callback) {
            delete answerCallbacks[msg.chat.id];
            return callback(msg);
        }
        else{
            if(msg.text !== "Mostrar opções..."){
                const dialogFlowResponse = dialogFlow.sendMessage(msg.chat.id.toString(), msg.text).then((resposta) => {
                    switch(resposta.text){
                        case "indicarProduto": {
                            //Cria botão para consultar o produto
                            bot.sendMessage(msg.chat.id, "Clique no botão abaixo para executar a opção desejada.\nCaso não for a opção desejada, digite novamente sua necessidade.", {
                                "reply_markup": {
                                    "inline_keyboard": [
                                        [
                                            {
                                                text: "Indicação de produto",
                                                callback_data: "indicarProduto"
                                            }
                                        ]
                                    ]
                                }
                            });

                            break;
                        }
                        case "falarAtendente": {
                            //Cria botão para chamar o atendente
                            bot.sendMessage(msg.chat.id, "Clique no botão abaixo para executar a opção desejada.\nCaso não for a opção desejada, digite novamente sua necessidade.", {
                                "reply_markup": {
                                    "inline_keyboard": [
                                        [
                                            {
                                                text: "Falar com Atendente",
                                                callback_data: "falarAtendente"
                                            }
                                        ]
                                    ]
                                }
                            });

                            break;s
                        }
                        case "statusPedido": {
                            //Cria botão para consultar o status do pedido
                            bot.sendMessage(msg.chat.id, "Clique no botão abaixo para executar a opção desejada.\nCaso não for a opção desejada, digite novamente sua necessidade.", {
                                "reply_markup": {
                                    "inline_keyboard": [
                                        [
                                            {
                                                text: "Consultar Status de Pedido",
                                                callback_data: "statusPedido"
                                            }
                                        ]
                                    ]
                                }
                            });

                            break;
                        }
                        case "rastrearPedido": {
                            //Cria botão para consultar o rastreio do pedido
                            bot.sendMessage(msg.chat.id, "Clique no botão abaixo para executar a opção desejada.\nCaso não for a opção desejada, digite novamente sua necessidade.", {
                                "reply_markup": {
                                    "inline_keyboard": [
                                        [
                                            {
                                                text: "Rastrear Pedido",
                                                callback_data: "rastrearPedido"
                                            }
                                        ]
                                    ]
                                }
                            });

                            break;
                        }
                        case "avaliarAtendimento": {
                            //Cria botão para avaliar o atendimento
                            bot.sendMessage(msg.chat.id, "Clique no botão abaixo para executar a opção desejada.\nCaso não for a opção desejada, digite novamente sua necessidade.", {
                                "reply_markup": {
                                    "inline_keyboard": [
                                        [
                                            {
                                                text: "Avaliar Atendimento",
                                                callback_data: "avaliarAtendimento"
                                            }
                                        ]
                                    ]
                                }
                            });

                            break;
                        }
                        case "avaliarCanal": {
                            //Cria botão para sugestão do cliente
                            bot.sendMessage(msg.chat.id, "Clique no botão abaixo para executar a opção desejada.\nCaso não for a opção desejada, digite novamente sua necessidade.", {
                                "reply_markup": {
                                    "inline_keyboard": [
                                        [
                                            {
                                                text: "Dê sua sugestão",
                                                callback_data: "avaliarCanal"
                                            }
                                        ]
                                    ]
                                }
                            });

                            break;
                        }
                    }
                });
            }
        }
    });
    
    //Botões de opções
    bot.onText(/Mostrar opções/, (msg, match) => {
        bot.sendMessage(msg.chat.id, "Por favor selecione a opção desejada:", {
            "reply_markup": {
                "inline_keyboard": [
                    [
                        {
                            text: "Indicação de produto",
                            callback_data: "indicarProduto"
                        },
                        {
                            text: "Falar com Atendente",
                            callback_data: "falarAtendente"
                        }
                    ],
                    [
                        {
                            text: "Consultar Status de Pedido",
                            callback_data: "statusPedido"
                        },
                        {
                            text: "Rastrear Pedido",
                            callback_data: "rastrearPedido"
                        }
                    ],
                    [
                        {
                            text: "Avaliar Atendimento",
                            callback_data: "avaliarAtendimento"
                        },
                        {
                            text: "Dê sua sugestão",
                            callback_data: "avaliarCanal"
                        }
                    ]
                ]
            }
        });
    });
    
    //Callback das opções
    bot.on("callback_query", (callbackQuery) => {
        const msg = callbackQuery.message;
        bot.answerCallbackQuery(callbackQuery.id)
            .then(() => {
                let texto = "";
                switch(callbackQuery.data){
                    case "indicarProduto": {
                        bot.sendChatAction(msg.chat.id, "typing");
                        texto="Por favor digite o nome, tipo ou característica do produto:";
                        bot.sendMessage(msg.chat.id,texto).then(() => {
                            answerCallbacks[msg.chat.id] = (response) => {
                                var item = response.text;
                                bot.sendMessage(msg.chat.id, `Aguarde um instante por favor que estou pesquisando em nosso site as opções de ${item}...`);
                                var consulta = carrefour.consultarItem(item).then((retorno) =>{
                                    bot.sendMessage(msg.chat.id, `Selecionamos 3 opções para você. De uma olhada: ${retorno.join(", ")}`);
                                    bot.answerCallbackQuery(callbackQuery.id);
                                });
                                return;
                            }
                        });
                        return;
                    }
                    case "falarAtendente": {
                        bot.sendChatAction(msg.chat.id, "typing");
                        var fila = Math.floor(Math.random() * (10-1)) + 1;
                        texto=`Por favor aguarde...\nTodos os nossos atendentes estão ocupados nesse momento.\nVocê é ${fila} na fila.`;
                        bot.sendMessage(msg.chat.id,texto);
                        return;
                    }
                    case "statusPedido" : {
                        bot.sendChatAction(msg.chat.id, "typing");
                        texto="Por favor informe o número do pedido: "
                        var pedido="";
                        bot.sendMessage(msg.chat.id,texto).then(() => {
                            answerCallbacks[msg.chat.id] = (response) => {
                                pedido = response.text;
                                bot.sendMessage(msg.chat.id, `Aguarde um instante por favor que estou pesquisando em nosso sistema a situação do pedido ${pedido}...`);
                                var status = mongoose.getStatusPedido(pedido).then((dadosPedido) => {
                                    if(dadosPedido !== null){
                                        texto=`O status do pedido ${dadosPedido.pedido} está como: ${dadosPedido.status}.\nO método de pagamento por ${dadosPedido.tipoPagamento} está com status de ${dadosPedido.statusPagamento}.`
                                    }
                                    else{
                                        texto=`Desculpe, mas não encontrei nenhuma informação sobre o pedido ${pedido}.\nPor favor verifique se o número está correto e tente novamente.`;
                                    }
                                    bot.sendMessage(msg.chat.id, texto);
                                    bot.answerCallbackQuery(callbackQuery.id);
                                });
                                
                                return;
                            }
                        });
                        return;
                    }
                    case "rastrearPedido" :{
                        bot.sendChatAction(msg.chat.id, "typing");
                        texto="Por favor informe o número do pedido para que eu possa verificar o rastreamento: ";
                        var pedido="";
                        bot.sendMessage(msg.chat.id,texto).then(() => {
                            answerCallbacks[msg.chat.id] = (response) => {
                                pedido = response.text;
                                bot.sendMessage(msg.chat.id, `Aguarde um instante por favor que estou pesquisando em nosso sistema a situação do pedido ${pedido}...`);
                                var status = mongoose.getStatusPedido(pedido).then((dadosPedido) => {
                                    if(dadosPedido !== null){
                                        texto=`O status do pedido ${dadosPedido.pedido} está como: ${dadosPedido.status}.\nO status do rastreamento está como: ${dadosPedido.statusRastreio}.`
                                    }
                                    else{
                                        texto=`Desculpe, mas não encontrei nenhuma informação sobre o pedido ${pedido}.\nPor favor verifique se o número está correto e tente novamente.`;
                                    }
                                    bot.sendMessage(msg.chat.id, texto);
                                    bot.answerCallbackQuery(callbackQuery.id);
                                });
                                
                                return;
                            }
                        });
                        return;
                    }
                    case "avaliarAtendimento" : {
                        bot.sendChatAction(msg.chat.id, "typing");
                        texto="Você ficou satisfeito com esse atendimento?\n Por favor informe uma nota de 0 a 10.";
                        var nota=0;
                        bot.sendMessage(msg.chat.id,texto).then(() => {
                            answerCallbacks[msg.chat.id] = (response) => {
                                nota = response.text;
                                
                                //Cria objeto com os dados da avaliação
                                var dadosAvaliacao = {
                                    "nomeUsuario": msg.chat.username,
                                    "chatId": msg.chat.id,
                                    "avaliacao": nota
                                };
                                
                                //Chama função para salvar a avaliação no banco de dados
                                mongoose.insertAvaliacao(dadosAvaliacao);
                                
                                bot.sendMessage(msg.chat.id, `Obrigado por sua avaliação (Nota ${nota}) ${msg.chat.username} ela é importante para nós.`);
                                bot.answerCallbackQuery(callbackQuery.id);

                                return;
                            }
                        });
                        return;
                    }
                    case "avaliarCanal": {
                        bot.sendChatAction(msg.chat.id, "typing");
                        texto="Estamos comprometidos com você nosso cliente e gostariamos de saber sua sugestão para melhorarmos nosso atendimento.\nDe sua sugestão e junto com nosso time iremos avaliá-la.";
                        var sugestao="";
                        bot.sendMessage(msg.chat.id,texto).then(() => {
                            answerCallbacks[msg.chat.id] = (response) => {
                                sugestao = response.text;
                                
                                //Cria objeto com os dados da sugestão
                                var dadosSugestao = {
                                    "nomeUsuario": msg.chat.username,
                                    "chatId": msg.chat.id,
                                    "sugestao": sugestao
                                };

                                //Chama função para salvar a avaliação no banco de dados
                                mongoose.insertSugestao(dadosSugestao);

                                bot.sendMessage(msg.chat.id, `Obrigado por sua sugestão ${msg.chat.username}. Ela é importante para nós e foi registrada com sucesso.`);
                                bot.answerCallbackQuery(callbackQuery.id);

                                return;
                            }
                        });
                        return;
                    }
                }
            });
    });
}

module.exports.chatBotTelegram = chatBotTelegram;