'use strict';

require("dotenv").config();
require("./src/console")();
const snoowrap = require("snoowrap");

const reddit = new snoowrap({
    userAgent: process.env.USER_AGENT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
});

const Discord = require("discord.js");
const Client = new Discord.Client();

Client.on("ready", () => {
    console.debug(`Logged in as ${Client.user.tag}`);
})

//Change those IDs if you wish to watch other channels than these
const announcementChannels = ["720987730791760012", "420959148465848330"]
Client.on("message", (message) => {
    if(announcementChannels.includes(message.channel.id) && message.content.length > 1){
        const now = new Date();
       reddit.getSubreddit("werewolfonline")
        .submit_selfpost({
            title: "Update discussion thread " + now.toDateString(),
            text: `${message.cleanContent}\n\n${message.attachments.size > 0 ? "[Attachment](" + message.attachments.array().map(at => at.url).join(")\n[Attachment](") + ")" : ""}`
        })
        .distinguish()
        .reply("Please use this thread to discuss this announcement. This is an automated post.")
    }
})

Client.login(process.env.DISCORD_TOKEN)

reddit.getSubreddit("werewolfonline").getNew({limit: 1}).then(posts => {
    const date = new Date(posts[0].created * 1000)
    console.log(`Reddit test: Latest post on r/werewolfonline is "${posts[0].title}" at ${date.toUTCString()}`)
})