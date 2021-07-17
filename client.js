const Client = require('./src/client/Client');

const client = new Client();

client.on('debug', console.log)

client.on('message', ()=>client.ws.shards.forEach(a=>console.log(a.ping)))

client.connect(process.env.TOKEN)

console.log(client)