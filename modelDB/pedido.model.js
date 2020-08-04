var mongoose = require("mongoose");

var PedidoSchema = new mongoose.Schema({
    pedido: {
        type: String,
        required: "Required"
    },
    status: {
        type: String,
        required: "Required"
    },
    tipoPagamento: {
        type: String,
        required: "Required"
    },
    statusPagamento: {
        type: String,
        required: "Required"
    },
    statusRastreio: {
        type: String,
        required: "Required"
    },
    data: {
        type: Date,
        required: "Required"
    }
});

mongoose.model("Pedido", PedidoSchema);