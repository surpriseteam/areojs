```javascript
const { Client } = require('areo.js');

const client = new Client();

client.on('ready', () => {
  console.log(`Connected as ${client.user.username}#${client.user.discrimintor} !`);
})


client.connect("YOUR_BOT_TOKEN_GOES_HERE");
```