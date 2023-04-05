const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('roll')
		.setDescription('Replies with a dice roll')
		.addIntegerOption(option =>
			option.setName('number')
				.setDescription("the number of dice you want to roll")
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('type')
				.setDescription("the number of dice you want to roll")
				.setRequired(true)
				.addChoices(
					{ name: 'd4', value: 4 },
					{ name: 'd6', value: 6 },
					{ name: 'd8', value: 8 },
					{ name: 'd10', value: 10 },
					{ name: 'd12', value: 12 },
					{ name: 'd20', value: 20 },
					{ name: 'd100', value: 100 },
			))
		.addBooleanOption(option =>
			option.setName('total')
				.setDescription('Whether or not results should be totalled'))
	
			,
	async execute(interaction) {
		const x = interaction.options.getInteger("number");
		const y = interaction.options.getInteger("type");
		const b = interaction.options.get("total");
		let tot = 0;
		let msg = '';
		for (let i = 0; i < x; i++) {
			int: c = Math.floor((Math.random() * y) +1);
				msg += (`\nR${i+1}: ${c}`);

			if (b != null && b.value)
				tot += c;
		}

		if (b != null && b.value)
			msg += (`Total: ${tot}`);

		await interaction.reply(`Rolled ${x} d${y} and got: \n` + msg);
	},
};
