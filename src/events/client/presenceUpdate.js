const Presence = require('../../schemas/presence');

module.exports = {
    name: 'presenceUpdate',
    async execute(oldPresence, newPresence) {
        presenceProfile = await Presence.findOne({
            userID: newPresence.user.id,
        });
        if (!presenceProfile) return;
        else {
            presenceProfile.status = newPresence.status;
            if (newPresence.activities.length === 0) {
                presenceProfile.activity = 'None';
                presenceProfile.save().catch(console.error);

                console.log(
                    `[${newPresence.status}] ${newPresence.user?.username}`
                );
            } else {
                const activity = newPresence.activities[0];
                presenceProfile.activity = activity.name;
                console.log(presenceProfile.activity);
                presenceProfile.save().catch(console.error);
            }
        }
    },
};
