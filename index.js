//API telegram
const telegram = require("./js/telegram");

//API mongoose
const connection = require("./modelDB/connection");

//Instância comunicação com o mongodb
connection.conectarMongoDB();

//Chama método para iniciar processamento das mensagens do telegram
telegram.chatBotTelegram();