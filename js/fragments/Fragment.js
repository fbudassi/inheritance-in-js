'use strict';

/**
 * Fragment Base. It extends EventEmitter to let fragments fire events and react to them.
 */
function Fragment(name) {
  EventEmitter.call(this); // Call parent's constructor.
  this._name = name;
}

Fragment.prototype = Object.create(EventEmitter.prototype);
Fragment.prototype.constructor = Fragment;

/**
 * Returns Fragment _name.
 * @returns {*}
 */
Fragment.prototype.getName = function () {
  return this._name;
};

/**
 * Override Object toString.
 * @returns {*}
 */
Fragment.prototype.toString = function () {
  return "Fragment Name: " + this._name;
};