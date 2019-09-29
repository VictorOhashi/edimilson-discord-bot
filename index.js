require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client()

let pessoas = ['2570']
let prefix = '!'

const frases = [
  'Foda....',
  'Não é o ideal mas acontece',
  'Sla só sei que o André é gay',
  'Comi sua mãe',
  'Sua irmã é minha',
  'Corno!!',
  'Já queimou seu Judeu hj??',
  'Já fez sua parte? Deu paulada em maconheiro hj?',
  `Sim eu sou LGBT:
   Levanta
   Gay
   Bora
   Trabalhar`,
  'Suicídio é sempre uma opção',
  'Desistir é pros fracos, faça como eu nem tente',
  'Talkei',
  'Imposto é roubo',
  'Bandindo tem q morre Talkei',
  'Meus filhos são mto bem educados',
  'Não roube! O Governo não gosta de concorrência.',
  'Minha autoestima está lá no céu. Morta.',
  'Não olhei pra baixo... pisei no email',
  'Não sou gay apenas um hétero diferenciado',
  'Não esqueça de respirar',
  'Existem mais aviões no fundo do mar do que submarinos voando',
  'A luta é grande, mas a derrota é certa',
  'Mano, ela é diferente das outras',
  '5 centímetros de puro prazer, 3 segundos de pura emoção',
  'Que porra de musica é essa que ta tocando caralho',
  'Pare de tentar e comece a desistir'
]

const andre = [
  'Vocé é muito gay',
  'Dps te apresento um instrumento mágico... cortador de unha',
  'Para de ficar desviando o olhar',
  'Volta pra roça de onde tu veio',
  'Olha pra mim se quiser falar comigo',
  'Inazuma é ruim',
  'Mega Men nem é jogo',
  'Não dirijo a palavra a negrinhos',
  'Vagabundo...',
  'Mano vai jogar seus emulador lá'
]

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

client.on('message', msg => {
  if (msg.author.discriminator === '5733') {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return
    const args = msg.content.slice(prefix.length).split(' ')
    const command = args.shift().toLowerCase()
    if (command === 'setpessoa') {
      if (!args.length) {
        msg.channel.send(`Digita o comando direito pó, ${msg.author}!`)
      } else {
        pessoas.push(args.shift())
        msg.channel.send(`Esse maluco foi adicionado na lista ${args}!`)
      }
    } else if (command === 'listpessoas') {
      msg.channel.send(`Esses caras estão na lista, ${pessoas}!`)
    } else if (command === 'clearpessoas') {
      pessoas = ['2570']
      msg.channel.send(`Relexa limpei a lista!`)
    }
  }
})

client.on('message', msg => {
  if (
    msg.author.discriminator === '5733' &&
    msg.content.toLowerCase() === 'vamos contar ate 500?'
  ) {
    let string = ''
    for (let i = 1; i < 501; i++) {
      string = string + ' ' + i
    }
    msg.channel.send(string)
  }
})

client.on('message', msg => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return
  const args = msg.content.slice(prefix.length).split(' ')
  const command = args.shift().toLowerCase()
  if (command === 'koe') {
    return msg.channel.send(frases[getRandomInt(0, frases.length - 1)])
  }
})

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'bom dia') {
    msg.channel.send(
      'Mermão bom dia é o caralho parcero, isso aqui é o grupo da torcida jovem, entendeu? Tu quer dar bom dia tu cria um grupo de viado, de GLS, e fica "bom dia", "boa tarde", "boa noite", ou então tu cria um grupo pra tua família, aí tu fica dando bom dia. Aqui é psicopata, ladrão, bandido, cheirador, vendedor de droga, polícia maluco, polícia assaltante, aqui tem a porra toda mermão, isso aqui é a Torcida Jovem do Flamengo! Bom dia é o caralho, rapá! Toma no cu...﻿'
    )
  }
})

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'onde eu deixo esse saco de batata') {
    msg.channel.send(
      'Deixa ai mano!!! Sai dai mano!!! Sai daqui!!! Sai com essas batata ai meu'
    )
  }
})

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'quem e voce') {
    msg.channel.send('Eu sou Edmilson!')
  }
})

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'trotos') {
    msg.channel.send('Broios')
  }
})

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'xesque') {
    msg.channel.send('Dele!')
  }
})

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'chama') {
    msg.channel.send('Chama no xesquedele!')
  }
})

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'dale') {
    msg.channel.send('Dale!')
    msg.channel.send('Dele!')
    msg.channel.send('Dele!')
    msg.channel.send('Doly!')
  }
})

client.on('message', msg => {
  if (msg.content.startsWith(prefix) || msg.author.bot) return
  const pessoa = pessoas.find(p => msg.author.discriminator === p)
  if (pessoa === '2570') {
    msg.reply(andre[getRandomInt(0, andre.length - 1)])
  } else if (pessoa) {
    msg.reply(frases[getRandomInt(0, frases.length - 1)])
  }
})

client.login(process.env.BOT_TOKEN)
