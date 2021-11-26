var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Client, Intents, Constants } = require("discord.js");
require("dotenv").config();
const imageSearch = require("image-search-google");
const imageClient = new imageSearch(process.env.CSEID, process.env.CSEKEY);
const randomItem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};
const searchQ = ["วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัส", "วันศุกร์", "วันเสาร๋"];
const bot = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
    ],
});
let d = new Date();
let dayOfWeek = searchQ[d.getDay()];
bot.on("messageCreate", (message) => {
    if (message.content.toLowerCase().startsWith(".flower")) {
        let d = new Date();
        let dayOfWeek = searchQ[d.getDay()];
        let q = "สวัสดี" + dayOfWeek;
        imageClient.search(q).then((imgs) => {
            let img = randomItem(imgs).url;
            while (!(img.endsWith(".png") || img.endsWith("pg") || img.endsWith("webm"))) {
                img = randomItem(imgs).url;
            }
            message.channel.send(`${img}`);
        });
    }
});
bot.on("ready", () => {
    console.log(`${bot.user.tag} is logged in`);
    bot.user.setActivity("สวัสดี" + dayOfWeek, { type: "PLAYING" });
    const guilds = bot.guilds.cache.map(guild => guild.id);
    let commands;
    guilds.forEach(guild => {
        var _a;
        commands = guild ? guild.commands : (_a = bot.application) === null || _a === void 0 ? void 0 : _a.commands;
        commands === null || commands === void 0 ? void 0 : commands.create({
            name: 'flower',
            description: 'Send beautiful flower pic'
        });
    });
});
bot.on('interactionCreate', (interaction) => __awaiter(this, void 0, void 0, function* () {
    if (!interaction.isCommand())
        return;
    const { commandName, options } = interaction;
    if (commandName === 'flower') {
        let d = new Date();
        let dayOfWeek = searchQ[d.getDay()];
        let q = "สวัสดี" + dayOfWeek;
        imageClient.search(q).then((imgs) => {
            let img = randomItem(imgs).url;
            while (!(img.endsWith(".png") || img.endsWith("pg") || img.endsWith("webm"))) {
                img = randomItem(imgs).url;
            }
            interaction.reply({
                content: img,
                ephemeral: false,
            });
        });
    }
}));
bot.login(process.env.TOKEN);
//# sourceMappingURL=index.js.map