const Client = require('../src');
const { Authorization } = require('./Authorization');

const util = require("util");

const client = Client();

client.on('DEV_DEBUG', (text, data) => {
  console.log(text);
  console.log(data);
});

client.on("WSMessage", console.log)

client.on('messageCreate', async message => {
  
  var prefix = "l+"
  
  if(!message.content.startsWith(prefix)) return;
  if(message.author.bot) return;
  
  const args = message.content.slice(2).split(" ")
  const command = args.shift();
  
  console.log(message)
  
  if(message.content.startsWith(prefix+'ping')) {
    var m =  await client.createMessage(message.channelID, {content:'Pong!'});
    console.log(m)
  }
  
  if(command === "eval") {
    if(message.author.id != '852922358170779658') return;
    
    var evaled = eval(args.join(" "));
    var inspected = util.inspect(evaled)
    
    console.log(inspected)
    console.log(await client.createMessage(message.channelID, {content:inspected}))
  }
})

client.connect(Authorization);

