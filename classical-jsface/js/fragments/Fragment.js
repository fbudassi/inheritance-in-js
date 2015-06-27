'use strict';

/**
 * Fragment Base. It extends EventEmitter to let fragments fire events and react to them.
 */
var Fragment = Class(EventEmitter, {
  constructor: function (name) {
    this._name = name;
  },

  /**
   * Returns Fragment _name.
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
    return "Fragment Name: " + this._name;
  }
});