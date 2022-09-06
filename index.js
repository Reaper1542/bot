const Discord = require("discord.js"); 
const client = new Discord.Client({intents: 32767});
const config = require("./config.json"); 
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const fs = require("fs");
const Canvas = require('canvas')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { token } = require('./config.json');
const { prefix } = require('./config.json')


client.login(config.token); 

client.once('ready', async () => {

    console.log(`🟢 - ${client.user.tag} Foi iniciada em ${client.guilds.cache.size} servidores!\n💻 - Tendo acesso a ${client.channels.cache.size} canais!\n👤 - Contendo ${client.users.cache.size} usuarios!` )

})

//stats do bot

client.on("ready", () => {
    let activities = [
        `www.nexoshopt.com`,
        `Temos disponivel`,
        `🎮 Gameserver`,
        `🎮 VPS`,
        `🎮 BOTS`,
        `🎮 Dominios`,
        `🎮 IPTV`,
        `🎮 Designers`,
        
        
      ],
      i = 0;
    setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
          type: "PLAYING"
        }), 4000); // tempo de trocar de stats, esta em milisegundos. 
    client.user
        .setStatus("online")
  });


  client.on("message", message =>{

    let digas = new Discord.MessageEmbed()
    .setColor("LUMINOUS_VIVID_PINK")
    .setDescription(`**💻 | Olá ${message.author}, o meu prefixo é \`${config.prefix}\`veja meus comandos com \`${config.prefix}help\`**`);

    if (message.author.bot) return
    if (message.content == `<@${client.user.id}>`) message.channel.send({ content: `${message.author}`, embeds: [digas] });
})



/*const Client = new client({
    intents: [
        'GUILDS',
        'GUILD_MESSAGE_REACTIONS',
        'GUILD_MESSAGES',
        'GUILD_INVITES',
        'GUILD_VOICE_STATES',
        'GUILD_MEMBERS',
        'GUILD_PRESENCES'

    ]
})
*/

//////////hanndler

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./commands/`);

fs.readdirSync('./commands/').forEach(local => {
    const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

    for(let file of comandos) {
        let puxar= require(`./commands/${local}/${file}`)

        if(puxar.name) {
            client.commands.set(puxar.name, puxar)
        } 
        if(puxar.aliases && Array.isArray(puxar.aliases))
        puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    } 
});


client.on("messageCreate", async (message) => {

    let prefix = config.prefix;
  
      if (message.author.bot) return;
      if (message.channel.type == 'dm') return;     
  
       if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    
      if(message.author.bot) return;
      if(message.channel.type === 'dm') return;
  
      if(!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
      let cmd = args.shift().toLowerCase()
      if(cmd.length === 0) return;
      let command = client.commands.get(cmd)
      if(!command) command = client.commands.get(client.aliases.get(cmd)) 
    
  try {
      command.run(client, message, args)
  } catch (error) { 
 
     console.error('Erro:' + error); 
  }
      });

      client.on("messageCreate", async (message) => {

    let prefix = config.prefix;
  
      if (message.author.bot) return;
      if (message.channel.type == 'dm') return;     
  
       if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    
      if(message.author.bot) return;
      if(message.channel.type === 'dm') return;
  
      if(!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
      let cmd = args.shift().toLowerCase()
      if(cmd.length === 0) return;
      let command = client.commands.get(cmd)
      if(!command) command = client.commands.get(client.aliases.get(cmd)) 
    
  try {

    let black = db.get(`blacklist_${message.author.id}`);

    if (black === "sim") {
        
        message.reply(`:x: ${message.author} Você está em minha blacklist!`).then(msg => {

        setTimeout( () => {
            msg.delete().catch(err=>{})
        }, 5000);

    })

}
    else

    if (black === "nao" || !black || black === null || black === false) {

        let canal = db.get(`canal_de_comandos_${message.guild.id}`);

        if (canal === null || canal === false || !client.channels.cache.get(canal) || canal === message.channel.id
        
        || message.member.permissions.has("ADMINISTRATOR")
        
        ) {

            command.run(client, message, args)

        }

        else

        if (message.channel.id !== canal) {
            
            message.reply(`Você não pode utilizar comandos aqui, apenas em <#${canal}>.`)
        
        }

    }

  } catch (err) { 
 
     console.error('Erro:' + err); 
  }
      });


////////////////////////////entrada canvas

client.on('guildMemberAdd', async (member) => {

    let foto = "https://cdn.discordapp.com/attachments/1012717578164121601/1015229884727033996/unknown.png"; // Coloque o link da foto que será utilizada na entrada do servidor.

    let chave = {};

    chave.create = Canvas.createCanvas(1024, 500);
    chave.context = chave.create.getContext('2d');
    chave.context.font = '72px sans-serif';
    chave.context.fillStyle = '#00001';

    Canvas.loadImage(foto).then( async (i) => {

        chave.context.drawImage(i, 0, 0, 1024, 500);
        chave.context.beginPath();
        chave.context.stroke();
        chave.context.fill();

        let chat = client.guilds.cache.get(member.guild.id).channels.cache.get('967427590178611311'); // Coloque o ID do canal de entrada.

        chave.context.font = '42px sans-serif',
        chave.context.textAlign = 'center';

        chave.context.fillText(`${member.user.tag}`, 480, 437);
        chave.context.beginPath();
        chave.context.arc(521, 200, 119, 0, Math.PI * 2, true);
        chave.context.closePath();
        chave.context.clip();

        await Canvas.loadImage(member.user.displayAvatarURL({ format: 'png', size: 1024})).then( async (i) => {

            chave.context.drawImage(i, 393, 80, 238, 238);

        })

        let mensagem = new Discord.MessageAttachment(chave.create.toBuffer(), `${member.user.tag}.png`)

        chat.send({ content: `${member}`, files: [mensagem] }).catch(e => {

            console.log(e)

        })
        
    })
})

////////////////////contador

client.on("messageCreate", (message) => {

    let canal_membros = client.channels.cache.get("967439240638103563");
    let canal_bots = client.channels.cache.get("967439244417175552");
    let canal_canais = client.channels.cache.get("967439247772614656");
    let canal_cargos = client.channels.cache.get("1009561761030086666");

    let nome_1 = `👤 Membros: ${message.guild.memberCount}`;
    let nome_2 = `🤖 Bots: ${message.guild.members.cache.filter(user => user.user.bot).size}`;
    let nome_3 = `💬 Canais: ${message.guild.channels.cache.size}`;
    let nome_4 = `💼 Cargos: ${message.guild.roles.cache.size}`;

    canal_membros.setName(nome_1)
    canal_bots.setName(nome_2)
    canal_canais.setName(nome_3)
    canal_cargos.setName(nome_4)

});


client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ip'){
        message.channel.send('O IP do Server é:\`anarquia.craftserv.gq\` ')
    }
})
/////////////////crash logs
process.on('multipleResolves', (type, reason, promise) => {
    client.channels.cache.get("ID DO CANAL").send(`⚠️ Erro Detectado 1: \` parte 1: ${type}\`\n・\`parte 2: ${promise}\`\n・\`parte 3: ${reason}\``)
    });
    process.on('unhandRejection', (reason, promise) => {
        client.channels.cache.get("ID DO CANAL").send(`⚠️ Erro Detectado 2: \`parte 1: ${reason}\`\n・\`parte 2: ${promise}\``)
    });
    
    process.on('uncaughtException', (error, origin) => { 
    setTimeout(function(){ 
      
    const embed = new Discord.MessageEmbed()
    .setTitle(`⚠️ ERRO DETECTADO:`)
    .setDescription(`\`\`\`${error}\`\`\``)
    .setColor("#ffffff")
      client.channels.cache.get("ID DO CANAL").send(embed)
    }, 1000); 
    });
    
    process.on('uncaughtExceptionMonitor', (error, origin) => { });