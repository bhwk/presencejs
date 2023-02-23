const { SlashCommandBuilder } = require('discord.js');
const Presence = require('../schemas/presence');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('database')
        .setDescription('Returns information from database'),
    async execute(interaction, client) {
        let presenceProfile = await Presence.findOne({
            userID: interaction.user.id,
        }).catch(console.error);

        if (!presenceProfile) {
            presenceProfile = await new Presence({
                _id: mongoose.Types.ObjectId(),
                userID: interaction.user.id,
            });
            await presenceProfile.save().catch(console.error);
            await interaction.reply({
                content: `USER ID: ${presenceProfile.userID}`,
            });
        } else {
            await interaction.reply({
                content: `user ID: ${presenceProfile.userID}`,
            });
            console.log(presenceProfile);
        }
    },
};
