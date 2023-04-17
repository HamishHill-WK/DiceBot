const { SlashCommandBuilder } = require('discord.js');
const { Permissions } = require('discord.js');

class PlayerCharacter {
    constructor(name, health) {
        this.name = name;
        this.health = health || 100;
        this._healthChangeCallbacks = [];
    }

    takeDamage(amount) {
        this.health -= amount;
        this._triggerHealthChangeCallbacks();
    }

    heal(amount) {
        this.health += amount;
        this._triggerHealthChangeCallbacks();
    }

    _triggerHealthChangeCallbacks() {
        for (const callback of this._healthChangeCallbacks) {
            callback(this.health);
        }
    }

    onHealthChange(callback) {
        this._healthChangeCallbacks.push(callback);
    }
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('health')
        .setDescription('Heal or take damage.')
        .addIntegerOption(option =>
            option.setName('action')
                .setDescription('The amount of health to heal or damage.')
                .setRequired(true).addChoices(
                    { name: 'Damage', value: 0 },
                    { name: 'Heal', value: 1 },
                    ))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The amount of health to heal or damage.')
                .setRequired(true)
        ),
    async execute(interaction) {
       

        const action = interaction.options.getInteger('action');
        const amount = interaction.options.getInteger('amount');

        if (amount < 0) {
            return await interaction.reply('Amount must be a positive number.');
        }

        const user = interaction.user;
        const guild = interaction.guild;
        const member = guild.members.cache.find(m => m.user.id === user.id);
        const playerCharacter = new PlayerCharacter(member.user.username, 100);

        if (action === 1) {
            playerCharacter.heal(amount);
            await interaction.reply(`Healed ${amount} health. New health: ${playerCharacter.health}.`);
        } else if (action === 0) {
            playerCharacter.takeDamage(amount);
            await interaction.reply(`Took ${amount} damage. New health: ${playerCharacter.health}.`);
        } else {
            await interaction.reply('Invalid action. Must be "heal" or "damage".');
        }
    },
};
