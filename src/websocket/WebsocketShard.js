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
  
  onMessage(data) {
    data = JSON.parse(data);
    
    const {op,d,s,t} = data;
    
    switch(op) {
      case 10:
       this.timers.setInterval("heartbeat", this.heartbeat, d.heartbeat_interval, this);
    }
  }
  
  heartbeat() {
    this.ws.send(JSON.stringify({
      op: 2,
      d: null
    }));
  }
}

module.exports = WebsocketShard
;