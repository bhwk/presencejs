const { SlashCommandBuilder } = require('discord.js');
const { user_ID } = require('..');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unregister')
        .setDescription('Removes user from watch list'),
    async execute(interaction) {
        const id = interaction.user.id;

        if(user_ID.includes(id)) {
            index = user_ID.indexOf(id);
            user_ID.splice(index,1);
            await interaction.reply({
                content: `${interaction.user} has been removed from watch list`,
                ephemeral:true
            });
        } else {
            await interaction.reply({
                content:`${interaction.user} is not on the watch list`,
                ephemeral:true
            });
        }
        console.log(user_ID)
    }
}