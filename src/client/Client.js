const EventEmitter = require('../util/EventEmitter');
const Collection = require('../util/Collection');

const WebsocketManager = require('../websocket/WebsocketManager');

class Client extends EventEmitter {
  constructor(options) {
    super();
    this.options = Object.assign({
      shardCount: 1
    }, options)
    
    this.guilds = new Collection();
  
  }

  
  async connect(token) {
    this.ws = new WebsocketManager(this);
    
    await this.ws.connect(token);
    
    return token;
  }
  
}

module.exports = Client;