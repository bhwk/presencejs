require('dotenv').config();
const { connect } = require('mongoose');
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { loadEvents } = require('./handlers/loadEvents');
const { loadCommands } = require('./handlers/loadCommands');

const user_ID = [];
exports.user_ID = user_ID;

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences],
});

client.commands = new Collection();

client.once(Events.ClientReady, (c) => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

loadEvents(client);
loadCommands(client);
client.login(process.env.TOKEN);
(async () => {
	await connect(process.env.DATABASE_TOKEN).catch(console.error);
})();
