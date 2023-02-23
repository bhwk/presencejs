const { user_ID } = require('..');

module.exports = {
	name: 'presenceUpdate',
	async execute(oldPresence, newPresence) {
		if (!user_ID.includes(newPresence.user?.id)) return;
		if (newPresence.activities.length === 0) {
			console.log(newPresence.user?.username);
			console.log(newPresence.status);
		} else {
			const status = newPresence.activities[0];
			console.log(status.name ?? 'nil');
			console.log((status.details, status.state) ?? 'nil');
		}
	},
};
