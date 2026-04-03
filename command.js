require('dotenv').config();
const {
    Client,
    GatewayIntentBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require('discord.js');

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

// ── Dad Jokes ────────────────────────────────────────────────────────────────
const dadJokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them.",
    "Why do cows wear bells? Because their horns don't work!",
    "I used to hate facial hair, but then it grew on me.",
    "What do you call cheese that isn't yours? Nacho cheese!",
    "Why can't you give Elsa a balloon? Because she'll let it go.",
    "I'm on a seafood diet. I see food and I eat it.",
    "What do you call a fake noodle? An impasta!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "I would tell you a joke about construction, but I'm still working on it.",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "What do you call a sleeping dinosaur? A dino-snore!",
    "How does a penguin build its house? Igloos it together!",
    "Why did the bicycle fall over? Because it was two-tired!",
    "What do you call a fish without eyes? A fsh!",
    "Did you hear about the guy who invented Lifesavers? He made a mint!",
    "Why can't your nose be 12 inches long? Because then it would be a foot!",
    "What do you call a bear with no teeth? A gummy bear!",
    "I only know 25 letters of the alphabet. I don't know y.",
    "Why did the golfer bring an extra pair of pants? In case he got a hole in one!",
    "What do you call a pile of cats? A meow-ntain!",
    "How do you organize a space party? You planet!",
    "Why did the tomato turn red? Because it saw the salad dressing!",
    "What's brown and sticky? A stick!",
    "I asked my dog what two minus two is. He said nothing.",
    "Why don't skeletons fight each other? They don't have the guts.",
    "What do you call a dinosaur that crashes their car? Tyrannosaurus wrecks!",
    "Why did the math book look so sad? Because it had too many problems.",
    "What do lawyers wear to court? Lawsuits!"
];

// ── Depressive Quotes ────────────────────────────────────────────────────────
const depressiveQuotes = [
    "The worst kind of pain is when you're smiling just to stop the tears from falling.",
    "I'm not okay, but I smile anyway.",
    "Sometimes you just want to disappear and see if anyone would miss you.",
    "I'm exhausted from trying to be stronger than I feel.",
    "Nobody really cares until something dramatic happens.",
    "The loneliest moment in someone's life is when they are watching their whole world fall apart.",
    "I close my eyes and dream of a place where I'm not alone.",
    "It's sad when you realize you aren't as important to someone as they are to you.",
    "I feel lost inside myself.",
    "Behind my smile is a hurting heart. Behind my laugh, I'm falling apart.",
    "Some days I feel everything at once. Other days I feel nothing at all.",
    "Empty. That's the only word I have for how I feel.",
    "Tired of waking up and having to face another day.",
    "I'm not angry at you. I'm just sad and tired.",
    "At some point you have to realize that some people can stay in your heart but not in your life.",
    "The saddest thing is when you are feeling real down and you look around and realize there is no shoulder for you.",
    "You sometimes think you want to disappear, but all you really want is to be found.",
    "I am so demanding on myself and sometimes I just break.",
    "Every day I wake up and hope today is different. It never is.",
    "People cry not because they are weak. It's because they've been strong for too long."
];

// ── Truth or Dare (Halal Mode) ────────────────────────────────────────────────
const truths = [
    "What's the most embarrassing thing you've ever done in public?",
    "Have you ever lied to get out of plans? What did you say?",
    "What's the weirdest dream you've ever had?",
    "What's the most childish thing you still do?",
    "Have you ever blamed someone else for something you did?",
    "What's a secret talent you haven't told anyone about?",
    "What's the most awkward situation you've ever been in?",
    "What's the strangest food combination you secretly enjoy?",
    "Have you ever walked into a glass door or wall?",
    "What's the silliest thing you've ever cried about?",
    "What's the most ridiculous lie you believed as a child?",
    "What's something you're irrationally afraid of?",
    "What's the most embarrassing song on your playlist?",
    "Have you ever sent a message to the wrong person? What was it?",
    "What's the longest you've gone without showering?",
    "What's a habit you have that you're a little ashamed of?",
    "What's the funniest thing that happened to you this week?",
    "Have you ever laughed at the wrong moment? What happened?",
    "What's the most dramatic thing you've done over something small?",
    "What's an opinion you have that most people would disagree with?"
];

const dares = [
    "Talk in a funny accent for the next 2 minutes.",
    "Do your best impression of someone in the group.",
    "Send a voice message singing Happy Birthday to someone random.",
    "Write a 3-sentence love story using only emojis.",
    "Type a message with your nose and send it.",
    "Say the alphabet backwards as fast as you can.",
    "Describe your day as if you were a medieval knight.",
    "Do 10 jumping jacks right now.",
    "Talk like a robot for the next 3 messages.",
    "Tell an embarrassing story about yourself in one minute.",
    "Call a family member and say 'I have something important to tell you' then say 'I love you, bye'.",
    "Change your profile picture to a potato for 10 minutes.",
    "Speak in rhymes for the next 5 minutes.",
    "Pretend to be a news reporter and describe what's in front of you.",
    "Do your best celebrity impression out loud.",
    "Write a poem about the last thing you ate.",
    "Narrate everything you do for the next 2 minutes like a documentary.",
    "Send a voice message doing your best villain laugh.",
    "Reply to the next 3 messages with only animal sounds.",
    "Draw a self-portrait in 30 seconds and share it."
];

// ── Commands ──────────────────────────────────────────────────────────────────
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // !dadjoke — posts a random dad joke
    if (message.content === '!dadjoke') {
        const joke = dadJokes[Math.floor(Math.random() * dadJokes.length)];
        return message.channel.send(`👨 **Dad Joke:** ${joke}`);
    }

    // !depquote — posts a random depressive quote
    if (message.content === '!depquote') {
        const quote = depressiveQuotes[Math.floor(Math.random() * depressiveQuotes.length)];
        return message.channel.send(`🖤 *${quote}*`);
    }

    // !tod — Truth or Dare (Halal Mode) with buttons
    if (message.content === '!tod') {
        const embed = new EmbedBuilder()
            .setTitle('✨ Truth or Dare — Halal Mode')
            .setDescription('Pick your challenge! Choose **Truth**, **Dare**, or let fate decide with **Random** 🎲')
            .setColor(0x9b59b6)
            .setFooter({ text: `Requested by ${message.author.username}` });

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('tod_truth')
                .setLabel('🧠 Truth')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('tod_dare')
                .setLabel('🔥 Dare')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('tod_random')
                .setLabel('🎲 Random')
                .setStyle(ButtonStyle.Secondary)
        );

        return message.channel.send({ embeds: [embed], components: [row] });
    }
});

// ── Button Interactions ───────────────────────────────────────────────────────
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    let result;
    let color;
    let title;

    if (interaction.customId === 'tod_truth') {
        result = truths[Math.floor(Math.random() * truths.length)];
        title = '🧠 Truth';
        color = 0x3498db;
    } else if (interaction.customId === 'tod_dare') {
        result = dares[Math.floor(Math.random() * dares.length)];
        title = '🔥 Dare';
        color = 0xe74c3c;
    } else if (interaction.customId === 'tod_random') {
        const isTruth = Math.random() < 0.5;
        result = isTruth
            ? truths[Math.floor(Math.random() * truths.length)]
            : dares[Math.floor(Math.random() * dares.length)];
        title = isTruth ? '🎲 Random → 🧠 Truth' : '🎲 Random → 🔥 Dare';
        color = isTruth ? 0x3498db : 0xe74c3c;
    } else {
        return;
    }

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(`> ${result}`)
        .setColor(color)
        .setFooter({ text: `Picked by ${interaction.user.username}` });

    await interaction.reply({ embeds: [embed] });
});

client.login(process.env.TOKEN);
