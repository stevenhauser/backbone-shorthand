(function() {

  var root = this,
      Backbone = root.Backbone;

  if ( !Backbone && (typeof require != "undefined") ) {
    Backbone = require("backbone");
  }

  var shorthandKey = "shorthand",
      slice = Array.prototype.slice;

  function createShorthandMethod(klass, methodName) {
    klass.prototype[methodName] = function() {
      var method = arguments.length ? "set" : "get",
          args = slice.call(arguments);
      args.unshift(methodName);
      return this[method].apply(this, args);
    };
  }

  Backbone.Model.shorthandify = function(attrs) {
    attrs = attrs || this.prototype[shorthandKey];
    if (!attrs) { return this; }
    if (typeof attrs == "string") { attrs = [attrs]; }
    for (var i = 0, l = attrs.length; i < l; i++) {
      createShorthandMethod(this, attrs[i]);
    }
    return this;
  };

  if (typeof exports != "undefined") {
    exports.shorthandify = Backbone.Model.shorthandify;
  }

}());
