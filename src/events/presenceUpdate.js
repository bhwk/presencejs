module.exports = async (oldPresence, newPresence) => {
    if (newPresence.activities.length === 0) {
            console.log(newPresence.user?.username);
            console.log(newPresence.status);
        } else {
            const status = newPresence.activities[0];
            console.log(status.name ?? 'nil');
            console.log((status.details, status.state) ?? 'nil');
        }
}
