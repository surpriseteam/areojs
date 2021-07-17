const https = require('https');
const url = require('url');

let apiURL = "https://discord.com/api/v9/";

function request(client, method, path, data) {
  apiURL += path;
  
  let parsedUrl = url.parse(apiURL);
  let config = {};
  
  config = Object.assign(parsedUrl, config);
  config.method = method.toUpperCase();
  config.headers = {
    Authorization: `Bot ${client.token}`,
    'Content-type': 'application/json'
  };
  
  return new Promise((resolve, reject) => {
    
    const req = https.request(config, res => {
      res.on('data', (d) => {
        client.emit('test', d.toString());
      });
      
    });
    
    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
    
  });
}

module.exports = request;