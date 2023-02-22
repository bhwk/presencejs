const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unregister')
        .setDescription('Removes user from watch list'),
    async execute(interaction) {
        const user = interaction.user
        await interaction.reply({
            content: `${user} has been removed from watch list`,
            ephemeral:true
        })
    }
}