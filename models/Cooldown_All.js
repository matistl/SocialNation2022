const Mongoose = require('mongoose');

const ModelCooldownsAll = Mongoose.Schema({

    guild: { type: String },
    user: { type: String },
    Daily: { Tiempo: { type: Number, default: 0 } },
    Weekly: { Tiempo: { type: Number, default: 0 } },
    Work: { Tiempo: { type: Number, default: 0 } },
    Rob: { Tiempo: { type: Number, default: 0 } },
    Fish: { Tiempo: { type: Number, default: 0 } },
    Slots: { Tiempo: { type: Number, default: 0 } },
    Ruleta: { Tiempo: { type: Number, default: 0 } },
    Memory: { Tiempo: { type: Number, default: 0 } },
    Mine: { Tiempo: { type: Number, default: 0 } }

})


module.exports = Mongoose.model('ModelCooldownsAll', ModelCooldownsAll);