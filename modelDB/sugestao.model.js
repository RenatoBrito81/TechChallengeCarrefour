var mongoose = require("mongoose");

var SugestaoSchema = new mongoose.Schema({
    nomeUsuario: {
        type: String,
        required: "Required"
    },
    chatId: {
        type: String
    },
    sugestao: {
        type: String,
        required: "Required"
    },
    data: {
        type: Date,
        required: "Required"
    }
});

mongoose.model("Sugestao", SugestaoSchema);