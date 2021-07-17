class Collection extends Map {
  constructor(entries) {
    super(entries);
  }
  
  forEach(fn) {
    for(let [key, value] of this) {
      fn(value, key);
    }
    
    return null;
  }
  
  reduce(fn, acumuledStartValue = 0) {
    
    for(let [key, value] of this) {
      acumuledStartValue = fn(acumuledStartValue, value);
    }
    
    return acumuledStartValue;
  }
}

module.exports = Collection;