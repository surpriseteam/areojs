const EventEmitter = require('../util/EventEmitter');
const Collection = require('../util/Collection');

const WebsocketManager = require('../websocket/WebsocketManager');

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
  
  async connect(token) {
    this.ws = new WebsocketManager(this);
    
    await this.ws.connect(token);
    
    return token;
  }
  
}

module.exports = Client;