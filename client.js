const Client = require('./src/client/Client');

const client = new Client();

client.on('debug', console.log)

client.on('WSMessage', (op, d, s, t) => {
  switch(t) {}
})

client.on('ready', () => {
  console.log(client)
})

client.connect(process.env.TOKEN)