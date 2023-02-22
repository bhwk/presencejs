require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const { loadEvents} = require('./handlers/loadEvents');
const { loadCommands } = require('./handlers/loadCommands');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildPresences] })

client.commands = new Collection();

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
});


client.login(process.env.TOKEN)
loadEvents(client)
loadCommands(client)