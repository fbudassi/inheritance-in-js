'use strict';

/**
 * Maplet Base. It extends EventEmitter to let maplets fire events and react to them.
 */
var Maplet = Class(EventEmitter, {
  constructor: function (name) {
    this._name = name;
  },

  /**
   * Returns Maplet _name.
   * @returns {*}
   */
  getName: function () {
    return this._name;
  },

  /**
   * Override Object toString.
   * @returns {*}
   */
  toString: function () {
    return "Maplet Name: " + this._name;
  }
});