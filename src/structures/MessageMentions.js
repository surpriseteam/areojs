const Collection = require('../util/Collection');

const Base = require('./Base');

const User = require('./User');

class MessageMentions extends Base {
  constructor(client, message={}) {
    super(client);
    
    this.users = new Collection(Array.from(message.mentions.map(u => new User(client, u)), _ => Array(_.id, _)));
    this.roles = message.mention_roles;
    
  }
}

module.exports = MessageMentions;