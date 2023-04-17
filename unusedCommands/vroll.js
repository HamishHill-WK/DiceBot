const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('vroll')
		.setDescription('Replies with a dice roll (VTM)')
		.addIntegerOption(option =>
			option.setName('numberofdice')
				.setDescription("the number of dice you want to roll")
				.setRequired(true))
		.addIntegerOption(option =>
			option.setName('difficulty')
				.setDescription("the number of dice you want to roll")
				.setRequired(true))
		.addBooleanOption(option =>
			option.setName('specialisation')
				.setDescription('Does a specialisation apply?'))
	,

	async execute(interaction) {
		const x = interaction.options.getInteger("numberofdice");
		const y = interaction.options.getInteger("difficulty");
		const b = interaction.options.get("specialisation");

		let msg = '';
		let succ = 0;
		let tens = 0;
		for (let i = 0; i < x; i++) {
			int: c = Math.floor((Math.random() * y) + 1); // returns random number between 1 and y 
			if (c >= y)
				succ += 1;

			if (b != null && b.value && c == 10)
				tens+=1;
		}

		for (let i = 0; i < tens; i++) {
			nt: c = Math.floor((Math.random() * y) + 1); // returns random number between 1 and y 
			if (c >= y)
				succ += 1;

			if (b != null && b.value && c == 10)
				tens+=1;
		}

		if (b != null && b.value)
			msg = (`Rolled ${x} dice got ${tens} 10s. \nGot ${succ} successes at difficulty ${y}`);

		if (b === null || !b.value)
			msg = (`Rolled ${x} dice. \nGot ${succ} successes at difficulty ${y}`);

		await interaction.reply(msg);
	},
};
