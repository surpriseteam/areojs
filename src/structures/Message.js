const Base = require('./Base');

const User = require('./User');
const GuildMember = require('./GuildMember');
const MessageMentions = require('./MessageMentions');
const MessageAttachment = require('./MessageAttachment');

class Message extends Base {
  constructor(client, data = {}) {
    super(client);
    
    /* COISAS PARA FAZER NESTA CLASS !! | THINGS TO DO IN THIS CLASS !
    
    COMPONENTS
    EMBED
    */
    
    this.id = data.id;
    this.channelID = data.channel_id;
    this.guildID = data.guild_id;
    this.content = data.content;
    this.nonce = data.nonce;
    
    this.type = Number(data.type);
    this.flags = Number(data.flags);
    
    this.referencedMessage = this.referenced_message instanceof Object ? new Message(this.referenced_message) : null;
    this.author = new User(client, data.author);
    this.member = new GuildMember(client, data.member);
    this.mentions = new MessageMentions(client, data);
    this.attachments = data.attachments.map((a) => new MessageAttachment(client, a));
    
    this.tts = Boolean(data.tts);
    this.pinned = Boolean(data.pinned);
    
    this.createdTimestamp = Date.parse(data.timestamp);
    this.createdAt = data.timestamp;
    
    this.editedAt = data.edited_timestamp;
    
    let editedParsed = Date.parse(this.editedAt);
    
    this.editedTimestamp = isNaN(editedParsed) ? null : editedParsed;
    
    client.emit('DEV_DEBUG', 'Message class instantied.', { Message: this.toJSON(), Data: data, Client: client });
  }
  
  toJSON() {
  let { id, channelID: channel_id, guildID: guild_id, content, nonce, type, flags, referencedMessage: referenced_message, author, member, attachments, tts, pinned, createdAt: timestamp, editedAt: edited_timestamp } = this;
    
    attachments = attachments.map(a => a.toJSON());
    
    return {
      id, channel_id, guild_id, content, nonce, type, flags, referenced_message, author, member, attachments, tts, pinned, timestamp, edited_timestamp
    };
  }
}

module.exports = Message;