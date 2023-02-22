// Require the necessary discord.js classes
require('dotenv').config()
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { loadEvents} = require('./handlers/loadEvents')

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences] })

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.TOKEN)
loadEvents(client)