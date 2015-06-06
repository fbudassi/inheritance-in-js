'use strict';

/**
 * Maplet Base. It extends EventEmitter to let maplets fire events and react to them.
 */
function Maplet(name) {
  EventEmitter.call(this); // Call parent's constructor.
  this._name = name;
}

Maplet.prototype = Object.create(EventEmitter.prototype);
Maplet.prototype.constructor = Maplet;

/**
 * Returns Maplet _name.
 * @returns {*}
 */
Maplet.prototype.getName = function () {
  return this._name;
};

/**
 * Override Object toString.
 * @returns {*}
 */
Maplet.prototype.toString = function () {
  return "Maplet Name: " + this._name;
};