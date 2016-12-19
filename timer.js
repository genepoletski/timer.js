var timer = function() {
  var
    timers = {},
    timerPublic = {},
    set, then, del, isSet;

  function Timer( timerID, callback, timeout ) {
    var self = this;
    this.timerID = timerID;
    this._resolves = [];
    this.timer =  setTimeout( function() {
      callback();
      self._resolves.forEach( function( fn ) {
        fn();
      } );
    }, timeout );
  }

  Timer.prototype = timerPublic;

  timerPublic.set = set = function( timerID, callback, timeout) {
    if ( isSet( timerID ) ) {
      del( timerID );
    }
    timers[ timerID ] = new Timer( timerID, callback, timeout );
    return timers[ timerID ];
  };

  timerPublic.del = del = function( timerID ) {
    if ( isSet( timerID ) ) {
      clearTimeout( timers[ timerID ].timer );
      delete timers[ timerID ];
      return true;
    }
    return false;
  };

  timerPublic.then = then = function( callback, timeout ) {
    this._resolves.push( callback );
    return timers[ this.timerID ];
  };

  timerPublic.isSet = isSet = function( timerID ) {
    return timers.hasOwnProperty( timerID );
  };

  return timerPublic;
};
