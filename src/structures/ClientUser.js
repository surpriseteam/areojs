const User = require('./User');

class ClientUser extends User {
  constructor(data) {
    super(data);
  }
}

module.exports = ClientUser;