const Mongoose = require('mongoose');

const ModelEconomy = Mongoose.Schema({

	guild: { type: String },
	user: { type: String },
	banco: { type: Number, default: 0 },
	monedero: { type: Number, default: 0 },
	diamante: { type: Number, default: 0 },
	carbon: { type: Number, default: 0 },
	oro: { type: Number, default: 0 },
	cuarzo: { type: Number, default: 0 },
	amatista: { type: Number, default: 0 },
	ruby: { type: Number, default: 0 },
	esmeralda: { type: Number, default: 0 },
	plata: { type: Number, default: 0 },
	cobre: { type: Number, default: 0 },
	rodio: { type: Number, default: 0 }

});

module.exports = Mongoose.model('ModelEconomy', ModelEconomy);