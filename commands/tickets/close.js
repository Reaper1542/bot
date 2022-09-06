const Discord = require("discord.js");
const {QuickDB} = require("quick.db");
const db = new QuickDB();

module.exports={
    name:"close",
    aliases:["c"],

    run:async(client,message,args) => {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply('Apenas membros comapermissão de \`ADMINISTRADOR\`, poderão utilizar este comando.');
                       message.channel.delete()
    }
}