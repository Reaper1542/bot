const Discord = require("discord.js")

module.exports = {
    name: "ban", // Coloqueonome do comando do arquivo
    aliases: ["banir"], // Coloque sinónimos aqui
   
    run: async(client, message, args) => {

 let motivo = args[0]
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            message.reply("Voçe nao possui permissao pra utilizar este comando")
        } else {

        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if(!motivo) motivo = "Não definido.";

        if (!user) {
            let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`\`!ban [membro] [motivo]\``);
 
            message.reply({ embeds: [embed] })

        } else {
                user.ban({reason: motivo}).then() ; message.reply(`O usuario \`${user.user.tag}\` foi banido com sucesso.`).catch(e =>{
                    message.reply(`,Não, foi, possivel, banir, o, usuario, \`${user.user.tag}\`.`)
                })
            }
        }
        }
}