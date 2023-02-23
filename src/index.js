require('dotenv').config();
const { connect } = require('mongoose');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { loadEvents } = require('./handlers/loadEvents');
const { loadCommands } = require('./handlers/loadCommands');
const Presence = require('./schemas/presence');
const express = require('express');
const app = express();
const PORT = 8080;

app.get('/presence/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    let presenceProfile = await Presence.findOne({
        userID: id,
    });
    console.log(presenceProfile);
    if (!presenceProfile) {
        res.status(418).send({ message: 'User ID does not exist!' });
    } else {
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
    app.listen(PORT, () => {
        console.log(`[EXPRESS] Listening on PORT:${PORT}`);
    });
});

loadEvents(client);
loadCommands(client);
client.login(process.env.TOKEN);
(async () => {
    await connect(process.env.DATABASE_TOKEN).catch(console.error);
})();
