require('dotenv').config();
const { connect } = require('mongoose');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { loadEvents } = require('./handlers/loadEvents');
const { loadCommands } = require('./handlers/loadCommands');
const Presence = require('./schemas/presence');
const express = require('express');
const app = express();

app.get('/presence/:id', async (req, res) => {
    const { id } = req.params;
    let presenceProfile = await Presence.findOne({
        userID: id,
    });
    if (!presenceProfile) {
        res.status(418).send({ message: 'User ID does not exist!' });
    } else {
        console.log(`[request] discord id: ${id}`);
        res.status(200).send({ presenceProfile });
    }
});

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences],
});

client.commands = new Collection();

client.once(Events.ClientReady, (c) => {
    console.log(`[Ready] Logged in as ${c.user.tag}`);

    app.use(express.json());
    app.listen(process.env.PORT, () => {
        console.log(`[EXPRESS] Listening for requests`);
    });
});

loadEvents(client);
loadCommands(client);
client.login(process.env.TOKEN);
(async () => {
    await connect(process.env.DATABASE_TOKEN).catch(console.error);
})();
