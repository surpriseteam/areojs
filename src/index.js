const Client = require('./client/Client');

module.exports = function (...a) {
  return new Client(...a);
};

module.exports.Client = Client;

module.exports.Areo = module.exports;