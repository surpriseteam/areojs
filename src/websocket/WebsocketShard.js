"use strict";

const EventEmitter = require('../util/EventEmitter');

const TimerManager = require('../managers/TimerManager')

const Ws = require("ws");

class WebsocketShard extends EventEmitter {
  constructor(ID, manager) {
    super()
    
    this.gateawayURL = "wss://gateway.discord.gg/?v=9&encoding=json"
    this.ID = ID;
    
    this.WebsocketManager = manager;
    
    this.timers = new TimerManager();
    
    this.lastHeartbeatSent = 0;
    this.hastHeartbeatReceived = 0;
  }
  
  get ping() {
    return this.lastHeartBeatReceived - this.lastHeartbeatSent;
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
    
    console.log(data)
    
    switch(op) {
      case 10:
       this.timers.setInterval("heartbeat", this.heartbeat.bind(this), d.heartbeat_interval);
       
       break;
       
       case 11:
         this.WebsocketManager.client.emit('message', null)
         this.lastHeartBeatReceived = Date.now();
    }
  }
  
  heartbeat() {
    this.debug("Heartbeat sent.")
    
    this.lastHeartbeatSent = Date.now();
    
        this.ws.send(JSON.stringify({
          op:1,
          d:null
    }))
  }
}

module.exports = WebsocketShard
;