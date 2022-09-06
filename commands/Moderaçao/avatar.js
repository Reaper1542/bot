const { MessageEmbed } = require("discord.js")

module.exports = { 
    name: "avatar",
    aliases: ["icon", "av"],

run: async(client, message, args) => {
let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

let avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 1024 })
let embed = new MessageEmbed() // shadow
.setTitle(`Avatar de ${user.username}`)
.setColor(`RED`)
.setImage(avatar)
.setFooter({ text: `Comando Utilizado por: ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true })})
await message.channel.send({ embeds: [embed] });
}
}

//By shadow