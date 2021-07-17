const Client = require('./src/client/Client');

const client = new Client();

client.on('debug', console.log)
client.on('test', console.warn)

client.on('WSMessage', (op, d, s, t) => {
  switch(t) {
    case 'MESSAGE_CREATE':
      break;
  }
})

client.on('ready', () => {
  console.log(client)
  client.createMessage("755864803570090054", {content:'Olá, mundo!'})
})

client.on('messageCreate', async message => {
  console.log(message)
})


client.connect(process.env.TOKEN)