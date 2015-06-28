'use strict';

/**
 * Depots Fragment.
 */
function DepotsFragment(name, activeCircle, totalDepots) {
  CircleFragment.call(this, name, activeCircle); // Call parent's constructor.
  this.setTotalDepots(totalDepots);
}

DepotsFragment.prototype = Object.create(CircleFragment.prototype);
DepotsFragment.prototype.constructor = DepotsFragment;

// Constructor Constants.
DepotsFragment.DEFAULT_TOTAL_DEPOTS = 40;
DepotsFragment.DEFAULT_ACTIVE_CIRCLE = 50;
DepotsFragment.Events = {
  DEPOTS_CHANGE: "depotsChange"
};

// Freeze object to prevent accidental changes.
Util.deepFreeze(DepotsFragment);

/**
 * Set the total number of depots.
 * @param depots An integer bigger than 0.
 */
DepotsFragment.prototype.setTotalDepots = function (depots) {
  if (typeof depots !== 'number' || (depots % 1) !== 0 || depots < 0) {
    console.error("Number of depots is invalid.");
    return;
  }

  this._totalDepots = depots;
  this._recalculate();
};

/**
 * Return the _totalDepots;
 * @returns {*}
 */
DepotsFragment.prototype.getTotalDepots = function () {
  return this._totalDepots;
};

/**
 * Return the number of selected depots.
 * @returns {number|*}
 */
DepotsFragment.prototype.getSelectedDepots = function () {
  return this._selectedDepots;
};

/**
 * Recalculate the number of _selectedDepots according to the _activeCircle.
 * @private
 */
DepotsFragment.prototype._recalculate = function () {
  this._selectedDepots = Math.round(this._activeCircle * this._totalDepots / 100);
  this.emitEvent(DepotsFragment.Events.DEPOTS_CHANGE, [this._selectedDepots]);
};