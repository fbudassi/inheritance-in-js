'use strict';

/**
 * Common features inherited by DepotsFragment and SchoolsFragment.
 */
function CircleFragment(name, activeCircle) {
  Fragment.call(this, name); // Call parent's constructor.
  this.setActiveCircle(activeCircle);
}

CircleFragment.prototype = Object.create(Fragment.prototype);
CircleFragment.prototype.constructor = CircleFragment;

/**
 * Set the active circle.
 * @param circle A number between 0 and 100.
 */
CircleFragment.prototype.setActiveCircle = function (circle) {
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
CircleFragment.prototype.getActiveCircle = function () {
  return this._activeCircle;
};

/**
 * Must be implemented by inherited CircleFragments.
 * @private
 */
CircleFragment.prototype._recalculate = function () {
  console.error("This class is not meant to be instantiated.");
};