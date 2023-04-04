require('dotenv').config(); //initialize dotenv
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();
const port = 9999;

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent]
});

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    //sendIt();
});

async function sendIt() {
    client.on('ready', async () => {
        const channel = await client.channels.fetch("1075386332630749215")
        // Note that it's possible the channel couldn't be found
        if (!channel) {
            return console.log("could not find channel")
        }
        channel.send("Your message " + port)
    });
}

app.get('/', (req, res) => res.send('hello world!!!'));

app.listen(port, async () => {
    console.log("Server at http:://localhost: $port");

    sendIt();
});

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
client.login('MTA3NTM4MjI3MTMzMjMzNTY1OA.GTGaYo.3jei-V1_NJdMm7oxyIPMHkeVce-U7tuSO_xRhs');