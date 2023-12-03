const mongoose = require('mongoose')

function user() {
    var schema = new mongoose.Schema({
        name: String,
        email: String
    }, { timestamps: true })
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const userSchema = mongoose.model("users", schema);
    return userSchema;
}

function data() {
    const schema = new mongoose.Schema({
        heartbeat: Number,
        blood_pressure: Number,
        oxygen_level: Number,
        distance: Number,
        mode: String
        // user: { type: mongoose.Types.ObjectId, ref: 'Users' }
    }, { timestamps: true })

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });
    const dataSchema = mongoose.model("datas", schema);
    return dataSchema;
}

module.exports = { user, data }