const Base = require('./Base');

const User = require('./User');
const GuildMember = require('./GuildMember');
const MessageMentions = require('./MessageMentions')

;class Message extends Base {
  constructor(client, data = {}) {
    super(client);
    
    /* COISAS PARA FAZER NESTA CLASS !! | THINGS TO DO IN THIS CLASS !
    
    MENTIONS + ChannelMentions (sendo feita)
    EDITED TIMESTAMP
    COMPONENTS
    EMBED
    ATTACHMENTS
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
    
    this.tts = Boolean(data.tts);
    this.pinned = Boolean(data.pinned);
    this.mentionEveryone = Boolean(data.mention_everyone);
    
    this.createdTimestamp = Date.parse(data.timestamp);
    this.createdAt = data.timestamp;
    
  }
}

module.exports = Message;