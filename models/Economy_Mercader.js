const Mongoose = require('mongoose');

const ModelMercader = Mongoose.Schema({

    guild: { type: String },
    user: { type: String },
    morado: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String },
        inShop: { type: Boolean, default: false }
    },
    rosa: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    cafe: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    naranja: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    fucsia: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    salmon: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    vino: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    verdepastel: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    dorado: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    lilapastel: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    fosforescente: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    negro: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    magenta: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    marine: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    litegreen: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    strongred: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    turquesa: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    navy: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    lime: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    golden: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    lowexclusive: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    },
    fullexclusive: {
        buyId: { type: String, default: undefined },
        value: { type: Number, default: undefined },
        id: { type: String, default: undefined },
        inShop: { type: Boolean, default: false }
    }

})

module.exports = Mongoose.model('ModelMercader', ModelMercader);