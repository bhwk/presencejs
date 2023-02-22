const { SlashCommandBuilder } = require('discord.js');
const { user_ID } = require('..');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Registers user to watcher list'),
    async execute(interaction) {
        const id = interaction.user.id;

        if (user_ID.includes(id)) {
            await interaction.reply({
                content: `${interaction.user} is already registered`,
                ephemeral: true
            })
        } else {
            user_ID.push(id);
            await interaction.reply({
                content: `${interaction.user} has been added to watch list`,
                ephemeral:true
            })
        }
        console.log(user_ID)
    }
}