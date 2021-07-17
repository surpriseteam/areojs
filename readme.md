```javascript
const { Client } = require('areo.js');

const client = new Client();

client.on('ready', () => {
  console.log(`Connected as ${client.user.username}#${client.user.discrimintor} !`);
})

client.on('messageCreate', async message => {
  
  if(message.content.startsWith('!ping')) {
    await client.createMessage(message.channelID, {content:'Pong!'});
  }
  
})

client.connect("YOUR_BOT_TOKEN_GOES_HERE");
```