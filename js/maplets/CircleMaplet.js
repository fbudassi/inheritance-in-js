'use strict';

/**
 * Common features inherited by DepotsMaplet and SchoolsMaplet.
 */
function CircleMaplet(name, activeCircle) {
  Maplet.call(this, name); // Call parent's constructor.
  this.setActiveCircle(activeCircle);
}

CircleMaplet.prototype = Object.create(Maplet.prototype);
CircleMaplet.prototype.constructor = CircleMaplet;

/**
 * Set the active circle.
 * @param circle A number between 0 and 100.
 */
CircleMaplet.prototype.setActiveCircle = function (circle) {
  if (typeof circle !== 'number' || circle < 0 || circle > 100) {
    console.error("Active circle is invalid.");
    return;
  }

  this._activeCircle = circle;
  this._recalculate();
};

/**
 * Return the _activeCircle;
 * @returns {*}
 */
CircleMaplet.prototype.getActiveCircle = function () {
  return this._activeCircle;
};

/**
 * Must be implemented by inherited CircleMaplets.
 * @private
 */
CircleMaplet.prototype._recalculate = function () {
  console.error("This class is not meant to be instantiated.");
};