require("dotenv").config();
const axios = require("axios");
const Discord = require("discord.js");
const client = new Discord.Client();

let pessoas = [];
let prefix = ".";

const frases = [
  "Foda....",
  "Não é o ideal mas acontece",
  "Sla só sei que o André é gay",
  "Comi sua mãe",
  "Sua irmã é minha",
  "Corno!!",
  "Já queimou seu Judeu hj??",
  "Já fez sua parte? Deu paulada em maconheiro hj?",
  `Sim eu sou LGBT:
   Levanta
   Gay
   Bora
   Trabalhar`,
  "Suicídio é sempre uma opção",
  "Desistir é pros fracos, faça como eu nem tente",
  "Talkei",
  "Imposto é roubo",
  "Bandindo tem q morre Talkei",
  "Meus filhos são mto bem educados",
  "Não roube! O Governo não gosta de concorrência.",
  "Minha autoestima está lá no céu. Morta.",
  "Não olhei pra baixo... pisei no email",
  "Não sou gay apenas um hétero diferenciado",
  "Não esqueça de respirar",
  "Existem mais aviões no fundo do mar do que submarinos voando",
  "A luta é grande, mas a derrota é certa",
  "Mano, ela é diferente das outras",
  "5 centímetros de puro prazer, 3 segundos de pura emoção",
  "Que porra de musica é essa que ta tocando caralho",
  "Pare de tentar e comece a desistir",
];


const messages = [
  {
    pergunta: ["bom dia", "buenos dias", "good morning"],
    resposta:
      'Mermão bom dia é o caralho parcero, isso aqui é o grupo da torcida jovem, entendeu? Tu quer dar bom dia tu cria um grupo de viado, de GLS, e fica "bom dia", "boa tarde", "boa noite", ou então tu cria um grupo pra tua família, aí tu fica dando bom dia. Aqui é psicopata, ladrão, bandido, cheirador, vendedor de droga, polícia maluco, polícia assaltante, aqui tem a porra toda mermão, isso aqui é a Torcida Jovem do Flamengo! Bom dia é o caralho, rapá! Toma no cu...﻿',
  },
  {
    pergunta: [
      "onde eu deixo esse saco de batata",
      "onde eu deixo esse saco de batata?",
    ],
    resposta:
      "Deixa ai mano!!! Sai dai mano!!! Sai daqui!!! Sai com essas batata ai meu",
  },
  {
    pergunta: ["quem e voce", "quem é voce", "quem é vc"],
    resposta: "Eu sou Edmilson o quebra galho do restaurante!",
  },
  {
    pergunta: ["koe", "eae"],
    resposta: () => frases[getRandomInt(0, frases.length - 1)],
  },
  {
    pergunta: [
      "quanto ta o dolar hoje?",
      "quanto ta o dólar hoje?",
      "quanto ta o dolar hoje",
      "quanto ta o dolar?",
      "quanto ta o dólar",
      "quanto ta o dolar",
    ],
    resposta: () => getDolar(),
  },
  {
    pergunta: [
      "como ta o corona?",
      "como ta o corona",
      "como ta o coronavirus?",
      "como ta o coronavirus",
      "como ta o coronavirus hoje",
      "como ta o coronavirus hoje?",
    ],
    resposta: () => getCorona(),
  },
];

async function getDolar() {
  const { data: { USD } = {} } = await axios.get(
    "https://economia.awesomeapi.com.br/all/USD-BRL"
  );
  return `Já viu o dólar hoje man... R$${USD.high}`;
}

async function getCorona() {
  const { data = {} } = await axios({
    method: "get",
    url: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
    headers: {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "5bbdd4e708msh44ce4a066047ac3p15648cjsnb651af974615",
    },
  });

  const { data: { latest_stat_by_country = [] } = {} } = await axios({
    method: "get",
    url:
      "https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=brazil",
    headers: {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "5bbdd4e708msh44ce4a066047ac3p15648cjsnb651af974615",
    },
  });
  const dataBrasil = latest_stat_by_country[0] || {};

  return `
Atualmente no mundo:
  Confirmados: ${data.total_cases}
  Total de mortos: ${data.total_deaths}
  Total recuperados: ${data.total_recovered}
  Novos casos: ${data.new_cases}
  Novas mortes: ${data.new_deaths}
  Dados de: ${data.statistic_taken_at}
---------------------------------------------------------
${
  latest_stat_by_country.length > 0
    ? `
Atualmente no brasil:
Confirmados: ${dataBrasil.total_cases}
Total de mortos: ${dataBrasil.total_deaths}
Total recuperados: ${dataBrasil.total_recovered}
Novos casos: ${dataBrasil.new_cases}
Novas mortes: ${dataBrasil.new_deaths}
Dados de: ${dataBrasil.record_date}
`
    : ""
}
  `;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const createRole = async (msg, arg, isRandom) => {
  if (msg.guild.roles.find((role) => role.name === msg.author.discriminator)) {
    try {
      await msg.guild.roles
        .find((role) => role.name === msg.author.discriminator)
        .delete();
    } catch (e) {
      console.error(e);
    }
  }
  await msg.member.guild
    .createRole({
      name: msg.author.discriminator,
      color: isRandom ? arg : `#${arg}`,
      position: 18,
    })
    .catch(console.error);

  msg.member.addRole(
    msg.guild.roles.find((r) => r.name === msg.author.discriminator)
  );
  msg.channel.send(`${msg.author} sua cor agora é #${arg}!`);
};

client.on("message", (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length).split(" ");
  const command = args.shift().toLowerCase();

  const hasPermission = msg.member.roles.find((r) => r.name === "Guarda Real");

  if (hasPermission) {
    if (command === "setcor") {
      const arg = args[0];
      if (arg && arg.length === 6) {
        createRole(msg, arg, false);
      } else if (!arg) {
        msg.channel.send(`Gerando cor aleatória para ${msg.author}!`);
        createRole(msg, getRandomColor(), true);
      } else {
        msg.channel.send(`So aceito valor do tipo hexcolor, ${msg.author}!`);
      }
    }
  } else {
    msg.channel.send(`${msg.author} você é fraco, lhe falta odio!`);
  }
});

client.on("message", (msg) => {
  if (msg.author.discriminator === "5733") {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(" ");
    const command = args.shift().toLowerCase();
    if (command === "setpessoa") {
      if (!args.length) {
        msg.channel.send(`Digita o comando direito pó, ${msg.author}!`);
      } else {
        pessoas.push(args.shift());
        msg.channel.send(`Esse maluco foi adicionado na lista ${args}!`);
      }
    } else if (command === "listpessoas") {
      msg.channel.send(`Esses caras estão na lista, ${pessoas}!`);
    } else if (command === "clearpessoas") {
      msg.channel.send(`Relexa limpei a lista!`);
    } else if (command === "ajuda") {
      msg.channel.send(
        "Pode usar esses comandos ai: setPessoa, listPessoas, clearPessoas, setCor"
      );
    }
  }
});

client.on("message", (msg) => {
  messages.forEach(async (m) => {
    const pergunta = m.pergunta.find((p) => msg.content.toLowerCase() === p);
    if (pergunta) {
      let resposta;
      if (typeof m.resposta === "function") {
        resposta = await m.resposta();
      } else {
        resposta = m.resposta;
      }
      msg.channel.send(resposta);
    }
  });
});

client.on("message", (msg) => {
  if (msg.content.startsWith(prefix) || msg.author.bot) return;
  const pessoa = pessoas.find((p) => msg.author.discriminator === p);
 if (pessoa) {
    msg.reply(frases[getRandomInt(0, frases.length - 1)]);
  }
});

client.login(process.env.BOT_TOKEN);

