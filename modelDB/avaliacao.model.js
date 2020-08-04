var mongoose = require("mongoose");

var AvaliacaoSchema = new mongoose.Schema({
    nomeUsuario: {
        type: String,
        required: "Required"
    },
    chatId: {
        type: String
    },
    avaliacao: {
        type: Number,
        required: "Required"
    },
    data: {
        type: Date,
        required: "Required"
    }
});

mongoose.model("Avaliacao", AvaliacaoSchema);