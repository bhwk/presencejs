const { Schema, model } = require('mongoose');
const presenceSchema = new Schema({
	_id: Schema.Types.ObjectId,
	userID: String,
});

module.exports = model('Presence', presenceSchema, 'Users');
