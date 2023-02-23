const { Schema, model } = require('mongoose');
const presenceSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userID: String,
    status: String,
    activity: String,
});

module.exports = model('Presence', presenceSchema, 'Users');
