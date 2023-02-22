const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Registers user to watcher list'),
    async execute(interaction) {
        const user = interaction.user
        await interaction.reply({
            content: `${user} has been added to watch list`,
            ephemeral:true
        })
    }
}