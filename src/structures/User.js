const Base = require('./Base')

;class User {
  constructor(data) {
    
    this.username = data.username;
    this.discriminator = data.discriminator;
    this.id = data.id;
    
    this.bot = Boolean(data.bot);
    this.system = Boolean(data.system);
    this.verified = Boolean(data.verified);
    this.mfaEnabled = Boolean(data.mfa_enabled);
    
    
    this.avatarHash = 'avatar' in data ? data.avatar : null;
    this.locale = 'locale' in data ? data.locale : null;
    this.email = 'email' in data ? data.email : null;
    this.premiumType = 'premium_type' in data ? data.premium_type : null;
    this.publicFlags = 'public_types' in data ? Number(data.public_flags) : null;
    
    this.flags = Number(data.flags);
    
  }
}

module.exports = User;