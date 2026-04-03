// const { Client, GatewayIntentBits } = require('discord.js');
//
// console.log("Bot starting...");
//
// const client = new Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.MessageContent
//   ]
// });
//
// client.once('clientReady', () => {
//   console.log(`Logged in as ${client.user.tag}`);
// });
//
// const annoyMap = new Map();
//
// client.on('messageCreate', async (message) => {
//   if (message.author.bot) return;
//
//   // START annoying
//   if (message.content.startsWith('!annoy')) {
//     const member = message.mentions.members.first();
//
//     if (!member) {
//       return message.reply("Mention someone ?");
//     }
//
//     if (!member.moderatable) {
//       return message.reply("I can't timeout this user (role issue)");
//     }
//
//     if (annoyMap.has(member.id)) {
//       return message.reply("Already annoying this user ?");
//     }
//
//     const interval = setInterval(async () => {
//       try {
//         console.log("Timeout:", member.user.tag);
//         await member.timeout(1000, "Annoying bot ?"); // 3 seconds
//       } catch (err) {
//         console.error("Error:", err);
//       }
//     }, 20000); // every 10 seconds
//
//     annoyMap.set(member.id, interval);
//
//     message.reply(`Started annoying ${member.user.tag} ?`);
//   }
//
//   // STOP annoying
//   if (message.content.startsWith('!stop')) {
//     const member = message.mentions.members.first();
//
//     if (!member) {
//       return message.reply("Mention someone to stop.");
//     }
//
//     const interval = annoyMap.get(member.id);
//
//     if (!interval) {
//       return message.reply("This user is not being annoyed.");
//     }
//
//     clearInterval(interval);
//     annoyMap.delete(member.id);
//
//     message.reply(`Stopped annoying ${member.user.tag} ?`);
//   }
// });
//
// client.login("");
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('clientReady', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Keep track of intervals per channel + user
const intervals = new Map();

client.on('messageCreate', (message) => {
    // Command: !stupi @user
    if (message.content.startsWith('!stupi')) {
        const user = message.mentions.users.first();
        if (!user) return message.channel.send("Please mention a user! Example: !stupi @username");

        // Prevent multiple intervals for the same user in the same channel
        const key = `${message.channel.id}-${user.id}`;
        if (intervals.has(key)) {
            return message.channel.send(`Already sending messages to ${user.tag}!`);
        }

        message.channel.send(`Starting spam for ${user.tag}... ?`);

        const interval = setInterval(() => {
            message.channel.send(`${user} You're stupid!`);
        }, 5000);

        intervals.set(key, interval);
    }

    // Command to stop the spam for a specific user: !stopstupi @user
    if (message.content.startsWith('!stopstupi')) {
        const user = message.mentions.users.first();
        if (!user) return message.channel.send("Please mention a user to stop!");

        const key = `${message.channel.id}-${user.id}`;
        if (intervals.has(key)) {
            clearInterval(intervals.get(key));
            intervals.delete(key);
            message.channel.send(`Stopped sending messages to ${user.tag} ?`);
        } else {
            message.channel.send(`No active spam for ${user.tag}`);
        }
    }
});

client.login(process.env.TOKEN);