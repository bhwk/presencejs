const { Schema, model } = require('mongoose');
const presenceSchema = new Schema({
    _id: Schema.Types.ObjectId,
    userID: { type: String, required: true },
    status: { type: String, default: 'None' },
    has_activity: { type: Boolean, default: false },
    activity: {
        type: Object,
    },
});

module.exports = model('User', presenceSchema, 'Users');
