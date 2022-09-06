const {MessageEmbed} = require ("discord.js")
module.exports = {
  name: "bans",
  aliases: ["listban", "list-ban", "banimentos"],
  //by baliza hehehe :)
  run: async (client, message, args) => {

   const bybaliza = message.guild.bans.fetch()
   const baliza_color = "RED"
   const baliza_d = (await bybaliza).map((baliza) => baliza.user.tag).join("\n") || "\`\`\`Ninguém foi banido\`\`\`"
    const bybaliza2 = new MessageEmbed()
    .setTitle('🛑 | Lista de banidos')
    .setDescription(baliza_d)
    .setColor(baliza_color)
    .setFooter(`${client.user.username}`, client.user.displayAvatarURL({dinamyc : true}))
    .setTimestamp(new Date())
    
    message.channel.send({embeds: [bybaliza2]})
  }
  }