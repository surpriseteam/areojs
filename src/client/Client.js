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
  
  createMessage(channelID, data, ...args) {
    var Msg = {};
    
    if(typeof data === 'string')  Msg.content = data;
    if(typeof data === "object") {
      Msg = Object.assign(Msg, data);
      if(Msg.embed) {
        if(!Msg.embeds) Msg.embeds = [];
        Msg.embeds.push(Msg.embed);
      }
    }
    
    return Client.request(this, 'post', `channels/${channelID}/messages`, Msg);
  }
  
  async connect(token) {
    this.ws = new WebsocketManager(this);
    
    await this.ws.connect(token);
    
    return token;
  }
  
}

Client.request = require('../API/request');

module.exports = Client;