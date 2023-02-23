const { Schema, model } = require('mongoose');
const presenceSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userID: String,
    activity: { type: String, required: false },
});

module.exports = model('Presence', presenceSchema, 'Users');
