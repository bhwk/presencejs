const { SlashCommandBuilder } = require('discord.js');
const Presence = require('../schemas/presence');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unregister')
        .setDescription('Removes user from watch list'),
    async execute(interaction) {
        let presenceProfile = await Presence.findOne({
            userID: interaction.user.id,
        });
        if (!presenceProfile) {
            await interaction.reply({
                content: `${interaction.user} is not on the watch list`,
                ephemeral: true,
            });
        } else {
            await Presence.deleteOne({ userID: interaction.user.id });
            await interaction.reply({
                content: `${interaction.user} has been removed from watch list`,
                ephemeral: true,
            });
        }
    },
};
