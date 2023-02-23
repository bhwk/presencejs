const { SlashCommandBuilder } = require('discord.js');
const Presence = require('../schemas/presence');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Registers user to watcher list'),

    async execute(interaction) {
        let presenceProfile = await Presence.findOne({
            userID: interaction.user.id,
        });

        if (!presenceProfile) {
            presenceProfile = await new Presence({
                _id: mongoose.Types.ObjectId(),
                userID: interaction.user.id,
            });

            await presenceProfile.save().catch(console.error);
            await interaction.reply({
                content: `${interaction.user} has been added to watch list`,
                ephemeral: true,
            });
        } else {
            await interaction.reply({
                content: `${interaction.user} <ID: ${presenceProfile.userID}> is already registered`,
                ephemeral: true,
            });
        }
    },
};
