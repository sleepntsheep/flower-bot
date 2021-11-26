const { Client, Intents } = require('discord.js')
require('dotenv').config()
const imageSearch = require('image-search-google')
const imageClient = new imageSearch(process.env.CSEID, process.env.CSEKEY)

const getImage = (str) => {
	return imageClient.search(str)
}

const randomItem = (arr) => {
	return arr[Math.floor(Math.random()*arr.length)]
}

const searchQ = [
	'วันอาทิตย์',
	'วันจันทร์',
	'วันอังคาร',
	'วันพุธ',
	'วันพฤหัส',
	'วันศุกร์',
	'วันเสาร๋'
]

const bot = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
})

let d = new Date()
let dayOfWeek = searchQ[d.getDay()]

bot.on('messageCreate', (message) => {
	if (message.content.toLowerCase().startsWith('.flower')) {
		let d = new Date()
		let dayOfWeek = searchQ[d.getDay()]
		let q = 'สวัสดี'+dayOfWeek

		getImage(q).then((imgs) => {
			let img = randomItem(imgs).url
			while (!(img.endsWith('.png') || img.endsWith('pg') || img.endsWith('webm'))) {
				img = randomItem(imgs).url
			}
			message.channel.send(`${img}`)
		})
	}
	else if (message.content.toLowerCase().startsWith('.search ')) {
		let q = message.content.slice(7)
		getImage(q).then((imgs) => {
			message.channel.send(`${randomItem(imgs).url}`)
		})
	}
})

bot.on('ready', () => {
	console.log(`${bot.user.tag} is logged in`)
	bot.user.setActivity("สวัสดี"+dayOfWeek, {type: 'PLAYING'})
})

bot.login(process.env.TOKEN)