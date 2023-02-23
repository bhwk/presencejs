const Presence = require('../../schemas/presence');

module.exports = {
    name: 'presenceUpdate',
    async execute(oldPresence, newPresence) {
        presenceProfile = await Presence.findOne({
            userID: newPresence.user.id,
        });
        if (!presenceProfile) {
            console.log('User not registered');
            return;
        } else {
            const status = newPresence.status;
            const activity = newPresence.activities[0];
            if (activity) {
                presenceProfile.has_activity = true;
            } else {
                presenceProfile.has_activity = false;
            }
            presenceProfile.status = status;
            presenceProfile.activity = activity;
            presenceProfile.save().catch(console.error);
        }
    },
};
