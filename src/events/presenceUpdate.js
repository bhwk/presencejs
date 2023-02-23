const Presence = require('../schemas/presence');

module.exports = {
    name: 'presenceUpdate',
    async execute(oldPresence, newPresence) {
        presenceProfile = await Presence.findOne({
            userID: newPresence.user.id,
        });
        if (!presenceProfile) return;
        else {
            if (newPresence.activities.length === 0) {
                presenceProfile.activity = newPresence.status;
                presenceProfile.save().catch(console.error);

                console.log(newPresence.user?.username);
                console.log(newPresence.status);
            } else {
                const status = newPresence.activities[0];
                console.log(status.name ?? 'nil');
                console.log((status.details, status.state) ?? 'nil');
            }
        }
    },
};
