const Collection = require('../util/Collection');

class TimerManager {
  constructor() {
    this._intervals = new Collection();
  }
  setInterval(name, fn, time, thisArg = this) {
    this._intervals.set(name, setInterval(()=>{
      fn.call(thisArg);
    }, time));
  }
}

module.exports = TimerManager;