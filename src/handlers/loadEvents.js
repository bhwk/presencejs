const { connection } = require('mongoose');
const fs = require('fs');
const path = require('path');

const eventsPath = path.resolve('src/events', 'client');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

const mongoPath = path.resolve('src/events', 'mongoEvents');
const mongoFiles = fs
    .readdirSync(mongoPath)
    .filter((file) => file.endsWith('.js'));

function loadEvents(client) {
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        client.on(event.name, (...args) => {
            event.execute(...args);
            console.log(`[${event.name}]`);
        });
    }

    for (const file of mongoFiles) {
        const filePath = path.join(mongoPath, file);
        const mongoEvent = require(filePath);
        connection.on(mongoEvent.name, (...args) =>
            mongoEvent.execute(...args)
        );
    }
}

module.exports = {
    loadEvents,
};
