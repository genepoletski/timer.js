var timer = function() {
  var
    timers = {},
    set, de, isSet;

  set = function( timerID, callback, timeout) {
    if ( isSet( timerID ) ) {
      del( timerID );
    }
    timers[ timerID ] = setTimeout( function() {
      callback();
    }, timeout );
  };

  del = function( timerID ) {
    if ( isSet( timerID ) ) {
      clearTimeout( timers[ timerID ] );
      return true;
    }
    return false;
  };

  isSet = function( timerID ) {
    return timers.hasOwnProperty( timerID );
  };

  return {
    set: set,
    del: del,
    isSet: isSet
  };
};
