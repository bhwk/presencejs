const event = (event) => require(`../events/${event}`);
const mongoEvent = (mongoEvent) =>
    require(`../events/mongoEvents/${mongoEvent}`);
const { connection } = require('mongoose');

function loadEvents(client) {
    client.on('presenceUpdate', event('presenceUpdate').execute);
    client.on('interactionCreate', event('interactionCreate').execute);

    //mongoDB events
    connection.once('connected', mongoEvent('connected').execute);
    connection.on('connecting', mongoEvent('connecting').execute);
    connection.on('disconnected', mongoEvent('disconnected').execute);
    connection.on('err', mongoEvent('err').execute);
}

module.exports = {
    loadEvents,
};
