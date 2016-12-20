  function timer() {
    var
        timers = {},
        timerPublic = {},
        set, then, del, isSet;

      function Timer( timerID, callback, timeout ) {
        var self = this;

        this.timerID = timerID;
        this.__queue = [];
        this.__queueTimer = null;
        this.__queueFn = null;

        this.timer =  setTimeout( function() {
          callback();
          if ( self.__queue.length > 0 ) {
            self.__resolveQueue( self.__queue );
          }
        }, timeout );

        this.__resolveQueue = function( queue ) {
          var timeout;
          if ( queue.length === 0 ) return;
          self.__queueFn = queue[0];
          timeout = queue[1] || 0;

          self.__queueTimer = setTimeout(
            function() {
              self.__queueFn();
              self.__queue.shift();
              self.__queue.shift();
              self.__resolveQueue( self.__queue );
            }, timeout );
        };

        this.__clearQueue = function() {
          clearTimeout( self.__queueTimer );
          self.__queueTimer = null;
          self.__queueFn = null;
          self.__queue = [];
        };
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
          timers[ timerID ].__clearQueue();
          delete timers[ timerID ];
          return true;
        }
        return false;
      };

      timerPublic.then = then = function( callback, timeout ) {
        this.__queue.push( callback );
        this.__queue.push( timeout );
        return timers[ this.timerID ];
      };

      timerPublic.isSet = isSet = function( timerID ) {
        return timers.hasOwnProperty( timerID );
      };

      return timerPublic;
    }
