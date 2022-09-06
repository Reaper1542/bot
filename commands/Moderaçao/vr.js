const discord = require('discord.js');

module.exports = {
    name: "vr", 
    aliases: ["verificar"],
    
    run: async (client, message, msg) => {
        const embed = new discord.MessageEmbed()//personalize sua embed do jeito que quiser 
            .setColor('GREEN')
            .setTitle('Registo')
            .setDescription(`Por favor lê os nossos termos
            Quando terminares, clica no ✅ para teres acesso ao Discord e servidor!
            
            
            👮‍♂️ Antes de entrares...
            Lê os termos da loja na sala 💼・termos , de forma a evitar confusoes nas compras.
            
            💻 Queres comprar os produtos.
            Para adquirir qualquer produtos podes consultar os preços na sala 🛒・vps ou se quiseres bots podes ir nesta sala #deleted-channel.
            
            💎 Depois da compra deixa o teu feedback!
            Para deixares o teu feedback basta ires na sala 💗・feedback
            💰Star$tore💰•© All Conected`)
           
 
const row = new discord.MessageActionRow()
    .addComponents([
new discord.MessageButton()
            .setCustomId('a1')
            .setLabel('Verificar')//nome do seu botão
            .setStyle("PRIMARY"),
            
new discord.MessageButton()
            .setCustomId('a2')
            .setLabel('🔔Promoçoes')//nome do seu botão
            .setStyle("PRIMARY"),
            
        new discord.MessageButton()
            .setCustomId('a3')
            .setLabel('🔔Updates')//nome do seu botão
            .setStyle("PRIMARY"),
            
new discord.MessageButton()
            .setCustomId('a4')
            .setLabel('🔔Giveaways')//nome do seu botão
            .setStyle("PRIMARY"),
])


 message.channel.send({ embeds: [embed], components: [row]})
      
    const filtro = m => m.customId === "a1" && m.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({filtro, time: 0 });

    collector.on("collect", m => {
        if(m.customId === "a1") {
            
             const role = message.guild.roles.cache.get('1015986492725788718');//coloque o id do cargo aqui

            if(m.member.roles.cache?.has('1015986492725788718')){

                m.member.roles.remove('1015986492725788718')

                m.reply({ content: `Cargos ${role} removido`, ephemeral: true });

            } else {

                m.member.roles.add('1015986492725788718')

                m.reply({ content: `Está Verificado!!!`, ephemeral: true })

            }

        }

            if(m.customId === 'a2'){

                const role = message.guild.roles.cache.get('1015986492750970943');//id do cargo aqui

            if(m.member.roles.cache?.has('1015986492750970943')){

                m.member.roles.remove('1015986492750970943')

                m.reply({ content: `Cargos ${role} removido`, ephemeral: true });

            } else {

                m.member.roles.add('1015986492750970943')

                m.reply({ content: `Cargos ${role} adicionado`, ephemeral: true })

            }

            }

         

        
        if(m.customId === "a3") {
            
             const role = message.guild.roles.cache.get('1016647913864179732');//id do cargo aqui

            if(m.member.roles.cache?.has('1016647913864179732')){

                m.member.roles.remove('1016647913864179732')

                m.reply({ content: `Cargos ${role} removido`, ephemeral: true });

            } else {

                m.member.roles.add('1016647913864179732')

                m.reply({ content: `Cargos ${role} adicionado`, ephemeral: true })

            }

        }

            if(m.customId === 'a4'){

                const role = message.guild.roles.cache.get('1015986492725788721');//id do cargo aqui

            if(m.member.roles.cache?.has('1015986492725788721')){

                m.member.roles.remove('1015986492725788721')

                m.reply({ content: `Cargos ${role} removido`, ephemeral: true });

            } else {

                m.member.roles.add('1015986492725788721')

                m.reply({ content: `Cargos ${role} adicionado`, ephemeral: true })

            }

            }

         

        })
    
   
    }

}