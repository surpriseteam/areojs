"use strict";

const EventEmitter = require('../util/EventEmitter')

;const TimerManager = require('../managers/TimerManager')

;const ClientUser = require('../structures/ClientUser')
;const Message = require('../structures/Message')
;const Guild = require('../structures/Guild')

;const Ws = require("ws")

;class WebsocketShard extends EventEmitter {
  constructor(ID, manager) {
    super()
    
    ;this.gateawayURL = "wss://gateway.discord.gg/?v=9&encodin;g=json"
    ;this.ID = ID
    
    ;this.WebsocketManager = manager
    ;this.client = this.WebsocketManager.client
    
    ;this.timers = new TimerManager()
    
    ;this.ping = -1
    ;this.lastHeartBeatSent = 0
    ;
  }
  
  async connect() {
    this.ws = new Ws(this.gateawayURL);
    
    this.ws.on('open', () => this.onOpen.call(this))
  }
  
  onOpen() {
  
  this.ws.send(JSON.stringify({
      op: 2,
      d: {
        token: this.WebsocketManager.client.token,
        intents: 513,
        shard: [this.ID, this.WebsocketManager.client.options.shardCount],
        properties: {
          $os: 'linux',
          $browser: 'repl.it',
          $device: 'repl.it'
        }
      }
    }))
    
    this.ws.on("message", data => this.onMessage.call(this, data))
    
    
  }
  
  debug(str) {
    this.WebsocketManager.client.emit('debug', str)
  }
  
  onMessage(data) {
    data = JSON.parse(data);
    
    const {op,d,s,t} = data;
    
    this.WebsocketManager.client.emit('WSMessage', op, d, s, t);
    
    switch(t) {
      case 'READY':
        
        if(!this.WebsocketManager.client.user) this.WebsocketManager.client.user = new ClientUser(this.WebsocketManager.client, d.user);
        
        this.WebsocketManager.client.shardsReadyCount++;
        
        
        if(this.WebsocketManager.client.shardsReadyCount >= this.WebsocketManager.client.options.shardCount) {
             this.WebsocketManager.client.ready = true;
             this.WebsocketManager.client.readyAt = Date.now();
             this.WebsocketManager.client.emit('ready', void this);
        }
       
        this.WebsocketManager.client.emit('shardReady', this.ID);
        break;
        
      case 'MESSAGE_CREATE':
         const message = new Message(this.WebsocketManager.client, d);
         
         this.WebsocketManager.client.emit('messageCreate', message);
         
         break;
         
      case 'MESSAGE_UPDATE':
         const messageUpdated = new Message(this.WebsocketManager.client, d);
         
         this.WebsocketManager.client.emit('messageUpdate', messageUpdated);
        break;
        
      case 'GUILD_CREATE':
        const guildCreated = new Guild(d, this.id, this.client);
        
        this.client.guilds.set(guildCreated.id, guildCreated);
        
        break;
        
    }
    
    switch(op) {
      case 10:
       this.timers.setInterval("heartbeat", this.heartbeat.bind(this), d.heartbeat_interval);
       
       break;
       
       case 11:
         this.ping = Date.now() - (this.lastHeartBeatSent === 0 ? (Date.now() + 1) : this.lastHeartBeatSent);
    }
  }
  
  heartbeat() {
    this.debug("Heartbeat sent.")
    
    this.lastHeartBeatSent = Date.now();
    
        this.ws.send(JSON.stringify({
          op:1,
          d:null
    }))
  }
}

module.exports = WebsocketShard
;