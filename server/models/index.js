const { user, data } = require('./schemas')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise

const db = {}

db.moongoose = mongoose;
db.url = process.env.DATABASE_URL
db.users = user()
db.datas = data()

module.exports = db;