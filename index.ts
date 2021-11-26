const { Client, Intents, Constants } = require("discord.js")
require("dotenv").config()
const imageSearch = require("image-search-google")
const imageClient = new imageSearch(process.env.CSEID, process.env.CSEKEY)

const randomItem = (arr:any[]) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const searchQ = ["วันอาทิตย์","วันจันทร์","วันอังคาร","วันพุธ","วันพฤหัส","วันศุกร์","วันเสาร๋"] as const

const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
})

let d:Date = new Date()
let dayOfWeek = searchQ[d.getDay()]

bot.on("messageCreate", (message) => {
  if (message.content.toLowerCase().startsWith(".flower")) {
    let d = new Date()
    let dayOfWeek = searchQ[d.getDay()]
    let q = "สวัสดี" + dayOfWeek

    imageClient.search(q).then((imgs) => {
      let img:string = randomItem(imgs).url
      while (
        !(img.endsWith(".png") || img.endsWith("pg") || img.endsWith("webm"))
      ) {
        img = randomItem(imgs).url
      }
      message.channel.send(`${img}`)
    })
  }
})

bot.on("ready", () => {
  console.log(`${bot.user.tag} is logged in`)
  bot.user.setActivity("สวัสดี" + dayOfWeek, { type: "PLAYING" })

  const guilds = bot.guilds.cache.map(guild => guild.id)
  let commands

  guilds.forEach(guild => {
    commands = guild ? guild.commands : bot.application?.commands

    commands?.create({
      name: 'flower',
      description: 'Send beautiful flower pic'
    })
  });
})

bot.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return
  const { commandName, options } = interaction

  if (commandName === 'flower') {
    let d:Date = new Date()
    let dayOfWeek = searchQ[d.getDay()]
    let q:string = "สวัสดี" + dayOfWeek
    imageClient.search(q).then((imgs) => {
      let img = randomItem(imgs).url
      while (
        !(img.endsWith(".png") || img.endsWith("pg") || img.endsWith("webm"))
      ) {
        img = randomItem(imgs).url
      }
      interaction.reply({
        content: img,
        ephemeral: false,
      })
    })
  }
})

bot.login(process.env.TOKEN)