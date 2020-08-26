import { Client, WebhookClient } from 'discord.js'
import express from 'express'
require('dotenv').config()

const app = express()

app.get('/', (req, res) => {
	console.log('Keeping Server alive!!')
	res.status(200).json({ message: 'Hello' })
})

app.listen(Number(process.env.PORT) || 3000, () => {
	console.log(`Listening at PORT ${process.env.PORT}`)
})

const client = new Client({
	partials: ['MESSAGE', 'REACTION'],
})

const webhookClient = new WebhookClient(
	process.env.WEBHOOK_ID!,
	process.env.WEBHOOK_TOKEN!
)

const PREFIX = '$'

client.on('ready', () => {
	console.log(`${client.user?.tag} has logged in.`)
})

client.on('message', async message => {
	if (message.author.bot) return

	if (
		(client.user && message.mentions.has(client.user)) ||
		(message.content.match(/(^hi|^hello|^hey)/i) &&
			message.channel.type === 'dm')
	) {
		message.reply(`Hi ${message.author.username}, What's up!!!`).catch(err => {
			message.reply(`Sorry!! :( Something went wrong. Please try again!!`)
		})
	}

	if (message.content.startsWith(PREFIX)) {
		const [CMD_NAME, ...args] = message.content
			.trim()
			.substring(PREFIX.length)
			.split(/\s+/)
		if (CMD_NAME === 'kick' && message.member) {
			if (!message.member.hasPermission('KICK_MEMBERS'))
				return message.reply('You do not have permissions to use that command')
			if (args.length === 0) return message.reply('Please provide an ID')
			const member = message.guild?.members.cache.get(args[0])
			if (member) {
				member
					.kick()
					.then(member => message.channel.send(`${member} was kicked.`))
					.catch(err => {
						console.log(err)
						message.channel.send('I cannot kick that user :(')
					})
			} else {
				message.channel.send('That member was not found')
			}
		} else if (CMD_NAME === 'ban' && message.member) {
			if (!message.member.hasPermission('BAN_MEMBERS'))
				return message.reply('You do not have permissions to use that command')
			if (args.length === 0) return message.reply('Please provide an ID')
			try {
				const user = await message.guild?.members.ban(args[0])
				message.channel.send('User was banned successfully')
			} catch (err) {
				console.log(err)
				message.channel.send(
					'An error occured. Either I do not have permissions or the user was not found'
				)
			}
		} else if (CMD_NAME === 'announce') {
			console.log(args)
			const msg = args.join(' ')
			console.log(msg)
			webhookClient.send(msg)
		}
	}
})

client.on('messageReactionAdd', (reaction, user) => {
	const { name } = reaction.emoji
	const member = reaction.message.guild?.members.cache.get(user.id)
	if (!member) return
	if (reaction.message.id === '738666523408990258') {
		switch (name) {
			case '🍎':
				member.roles.add('738664659103776818')
				break
			case '🍌':
				member.roles.add('738664632838782998')
				break
			case '🍇':
				member.roles.add('738664618511171634')
				break
			case '🍑':
				member.roles.add('738664590178779167')
				break
		}
	}
})

client.on('messageReactionRemove', (reaction, user) => {
	const { name } = reaction.emoji
	const member = reaction.message.guild?.members.cache.get(user.id)
	if (!member) return
	if (reaction.message.id === '738666523408990258') {
		switch (name) {
			case '🍎':
				member.roles.remove('738664659103776818')
				break
			case '🍌':
				member.roles.remove('738664632838782998')
				break
			case '🍇':
				member.roles.remove('738664618511171634')
				break
			case '🍑':
				member.roles.remove('738664590178779167')
				break
		}
	}
})

client.login(process.env.DISCORD_TOKEN)
