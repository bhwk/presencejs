const event = (event) => require(`../events/${event}`)

function loadEvents(client) {
    client.on("presenceUpdate", event("presenceUpdate"))
}

module.exports = {
    loadEvents,
}