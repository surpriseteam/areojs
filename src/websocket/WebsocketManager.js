const EventEmitter = require('../util/EventEmitter')

;const Collection = require('../util/Collection')
;const WebsocketShard = require('./WebsocketShard')

;class WebsocketManager extends EventEmitter {
  constructor(client) {
    super();
    
    this.client = client;
    
    this.shards = new Collection();
    
  }
  
  connect(token) {
    
    Object.defineProperty(this.client, 'token', {
      value: token
    })
    
    this.createShards();
    
    this.shards.forEach(async shard => {
      await shard.connect()
    });
    
  }
  
  createShards() {
    for(let ID of Array.from({ length: this.client.options.shardCount }, (_, i) => i)) {
      this.shards.set(ID, new WebsocketShard(ID, this));
    }
  }
}

module.exports = WebsocketManager;