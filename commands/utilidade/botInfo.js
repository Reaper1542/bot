const Discord = require("discord.js")

module.exports = {
    name: "botinfo", 
    aliases: ["bi"],

    run: async(client, message, args) => {

        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        let data = user.createdAt.toLocaleDateString("pt-br");
        let avatar = user.displayAvatarURL({ dynamic: true });

        let embed = new Discord.MessageEmbed()
        .setColor("#7B68EE")
        .setTitle(`__Informações do bot abaixo:__`)
        .setDescription(`Olá ${message.author} tudo bem? Eu sou um simples bot com funções como moderação, informações e diversão.`)
        .addFields(
            {
                name: '<:setup:937805686677573702> Informações ',
                value: `> <:desktop:1008392582918840390> Nome: ${client.user}
                > <:man_construction_worker:1008393825867268236> Desenvolvedor: <@!900810161856344155>
                > <:ping_pong:1008388713040060426> Ping: \`${client.ws.ping}ms\`
                > <:computer:1008391431364296836> Prefixo: \`A!\``,
                inline: false
            },
            {
                name: '<:cloud:1008391817777131600> Estatísticas',
                value: `> <:family:1008394308275155086> Servidores: \`${client.guilds.cache.size}\`
                > <:busts_in_silhouette:1008393353194377266> Usuários: \`${client.users.cache.size}\`
                > <:man_gesturing_no:1008395889020260413> Comandos: \`20\``,
                inline: false
    
            },
            {
                name: '<:computer:1008391431364296836> Outras Informações',
                value: `> <:id:937814768360771694> Meu id: \`994348723519897620\`
                > <:calendar:1008388879671382076> Data de criação: \`06/07/2022\`
                > <:keyboard:1008392926545596476> Linguagem: \`JavaScript\`
                > <:file_folder:1008390034870767667> Livraria: \`Discord.js\`
                > <:cloud:1008391817777131600> Hospedagem: \`DisCloud\``,
                inline: false
            },
            
        );

        message.reply({ embeds: [embed] })


       
        
    } 
} 