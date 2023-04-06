require('dotenv').config(); //initialize dotenv
const express = require('express');
const app = express();
const net = require('node:net');
const port = 9999;
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//https://stackoverflow.com/questions/71430312/sending-message-to-specific-channel-in-discord-js
async function sendIt(message) {
    const channel = await client.channels.fetch("1075386332630749215");
    if (!channel) {
        return console.log("could not find channel");
    }
    channel.send({ content: `message: ${message}` });
}

//app.get('/', (req, res) => res.send('hello world!!!'));

//app.listen(port, async () => {
//    console.log("Server at http:://localhost: $port");

//    //sendIt();
//});

//https://stackoverflow.com/questions/6297616/nodejs-strings-from-client-messages
var server = net.Server(function (socket) {
    socket.setEncoding('ascii');

    socket.on('data', function (data) {
        // do something with data
        console.log(`${data}`);
        sendIt(data);
    });

    socket.on('end', function () {
        // socket disconnected, cleanup
    });

    socket.on('error', function (exception) {
        // do something with exception
    });
});
server.listen(4000);

client.on('messageCreate', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
    
    if (msg.content === 'roll 20') {
        int: c = Math.floor(Math.random() * 20);
        msg.reply("" + c);
    }
});

//make sure this line is the last line
client.login(token);