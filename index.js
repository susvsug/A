const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once("ready", async () => {
    console.log(`${client.user.tag} Online`);

    client.user.setPresence({
        status: "dnd",
        activities: [{
            name: "The Underworld",
            type: ActivityType.Streaming,
            url: "https://twitch.tv/discord"
        }]
    });

    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    const channel = await guild.channels.fetch(process.env.VOICE_CHANNEL_ID);

    joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: false
    });

    console.log("Joined Voice Channel");
});

client.login(process.env.TOKEN);
