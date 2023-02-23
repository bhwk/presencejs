module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (!interaction.isChatInputCommand());

		const command = interaction.client.commands.get(
			interaction.commandName
		);

		if (!command) {
			console.error(
				`No command matching ${interaction.commandName} was found.`
			);
			return;
		}

		try {
			await command.execute(interaction);
			console.log(
				`[${interaction.commandName}] called by ${interaction.user}, ${interaction.user.username}`
			);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};
