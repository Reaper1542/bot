const Discord = require("discord.js");
const { MessageSelectMenu, MessageActionRow } = require("discord.js");

module.exports = {

    name: "open",
    aliases: ["tkm", "ticket_menu"],

    run: async(client, message, args) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply(`Apenas membros com a permissão de \`ADMINISTRADOR\`, poderão utilizar este comando.`);

        message.delete();

        let embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(`**Crie um ticket selecionando uma categoria abaixo:**`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }));


        let painel = new MessageActionRow().addComponents( new MessageSelectMenu()
        .setCustomId('menu')
        .setPlaceholder('Clique aqui.') // Mensagem estampada
        .addOptions([
               {
                    label: 'Suporte Geral',
                    description: '',
                    emoji: '🙋‍♂️',
                    value: 'geral',
               },
               {
                label: 'Bots',
                description: '',
                emoji: '🤖',
                value: 'bot',
               },
               {
                label: 'VPS',
                description: '',
                emoji: '💻',
                value: 'VPS',
               },
               {
                label: 'Gameserver',
                description: '',
                emoji: '💎',
                value: 'gameserver',
               },
            ])

        );


        message.channel.send({ embeds: [embed], components: [painel] }).then(msg => {


            const filtro = (interaction) => 
            interaction.isSelectMenu()
      
          const coletor = msg.createMessageComponentCollector({
            filtro
          });
      

          coletor.on('collect', async (collected) => {

            let ticket = collected.values[0]
            collected.deferUpdate()




            if (ticket === "geral") {

                let embed_geral = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`**🙋‍♂️ Olá <@${collected.user.id}>, seu ticket foi criado na categoria \`Suporte Geral\`.**`);

                message.guild.channels.create(`<@${collected.user.username}> geral`, {
                    type : 'GUILD_TEXT',
                    permissionOverwrites : [
                        {
                            id : message.guild.id,
                            deny : ['VIEW_CHANNEL']
                        },
                        {
                            id : collected.user.id,
                            allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                        }
                    ]
                }).then(async (chat_ferinha) => {
        
                    chat_ferinha.send({ embeds: [embed_geral] }).then(msg => msg.pin() );
        
                });


            }



            if (ticket === "Bots") {

                let embed_bot = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`**🤖 Olá <@${collected.user.id}>, seu ticket foi criado na categoria \`bots\`.**`);

                message.guild.channels.create(` <@${collected.user.username}> Bots `, {
                    type : 'GUILD_TEXT',
                    permissionOverwrites : [
                        {
                            id : message.guild.id,
                            deny : ['VIEW_CHANNEL']
                        },
                        {
                            id : collected.user.id,
                            allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                        }
                    ]
                }).then(async (chat_ferinha) => {
        
                    chat_ferinha.send({ embeds: [embed_denuncias] }).then(msg => msg.pin() );
        
                });
                
            }



            if (ticket === "VPS") {

                let embed_vps = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`**💻 Olá <@${collected.user.id}>, seu ticket foi criado na categoria \`VPS\`.**`);

                message.guild.channels.create(` <@${collected.user.username}> Bugs `, {
                    type : 'GUILD_TEXT',
                    permissionOverwrites : [
                        {
                            id : message.guild.id,
                            deny : ['VIEW_CHANNEL']
                        },
                        {
                            id : collected.user.id,
                            allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                        }
                    ]
                }).then(async (chat_ferinha) => {
        
                    chat_ferinha.send({ embeds: [embed_bot] }).then(msg => msg.pin() );
        
                });
                
            }
            if (ticket === "Gameserver") {

                let embed_gameserver = new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`**🎮 Olá <@${collected.user.id}>, seu ticket foi criado na categoria \`gameserver\`.**`);

                message.guild.channels.create(` <@${collected.user.username}> gameserver `, {
                    type : 'GUILD_TEXT',
                    permissionOverwrites : [
                        {
                            id : message.guild.id,
                            deny : ['VIEW_CHANNEL']
                        },
                        {
                            id : collected.user.id,
                            allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES']
                        }
                    ]
                }).then(async (chat_ferinha) => {
        
                    chat_ferinha.send({ embeds: [embed_denuncias] }).then(msg => msg.pin() );
        
                });
                
            }


          })
                

        });

        

    }
}