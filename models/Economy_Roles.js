const Mongoose = require('mongoose');

const ModelRoles = Mongoose.Schema({

	guild: { type: String },
	user: { type: String },
	morado: { type: Boolean, default: false },
	rosa: { type: Boolean, default: false },
	cafe: { type: Boolean, default: false },
	naranja: { type: Boolean, default: false },
	fucsia: { type: Boolean, default: false },
	salmon: { type: Boolean, default: false },
	vino: { type: Boolean, default: false },
	verdepastel: { type: Boolean, default: false },
	dorado: { type: Boolean, default: false },
	lilapastel: { type: Boolean, default: false },
	fosforescente: { type: Boolean, default: false },
	negro: { type: Boolean, default: false },
	magenta: { type: Boolean, default: false },
	marine: { type: Boolean, default: false },
	litegreen: { type: Boolean, default: false },
	strongred: { type: Boolean, default: false },
	turquesa: { type: Boolean, default: false },
	navy: { type: Boolean, default: false },
	lime: { type: Boolean, default: false },
	golden: { type: Boolean, default: false },
	lowexclusive: { type: Boolean, default: false },
	fullexclusive: { type: Boolean, default: false }

})

module.exports = Mongoose.model('ModelRoles', ModelRoles);