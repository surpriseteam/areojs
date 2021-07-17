const Client = require('./src/client/Client');

const client = new Client();

client.connect(process.env.TOKEN)

console.log(client)