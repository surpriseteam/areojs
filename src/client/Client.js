const EventEmitter = require('../util/EventEmitter');
const Collection = require('../util/Collection');

const WebsocketManager = require('../websocket/WebsocketManager');

const Message = require('../structures/Message');

class Client extends EventEmitter {
  constructor(options) {
    super();
    
    this.options = Object.assign({
      shardCount: 1
    }, options);
  
    this.shardsReadyCount = 0;
    this.ready = false;
    this.readyAt = null;
    
    this.guilds = new Collection();
  
  }
  
  get uptime() {
    return this.readyAt - Date.now();
  }
  
  createMessage(channelID, data) {
    
    return new Promise(resolve => {
      Client.request(this, 'post', `channels/${channelID}/messages`, data).then(m => resolve(new Message(this, m)));
    });
    
  }
  
  async connect(token) {
    this.ws = new WebsocketManager(this);
    
    await this.ws.connect(token);
    
    return token;
  }
  
}

Client.request = require('../API/request');

module.exports = Client;