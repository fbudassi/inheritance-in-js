'use strict';

/**
 * Depots Maplet.
 */
function DepotsMaplet(name, activeCircle, totalDepots) {
  CircleMaplet.call(this, name, activeCircle); // Call parent's constructor.
  this.setTotalDepots(totalDepots);
}

DepotsMaplet.prototype = Object.create(CircleMaplet.prototype);
DepotsMaplet.prototype.constructor = DepotsMaplet;

// Constructor Constants.
DepotsMaplet.DEFAULT_TOTAL_DEPOTS = 40;
DepotsMaplet.DEFAULT_ACTIVE_CIRCLE = 50;
DepotsMaplet.Events = {
  DEPOTS_CHANGE: "depotsChange"
};

// Freeze object to prevent accidental changes.
utils.deepFreeze(DepotsMaplet);

/**
 * Set the total number of depots.
 * @param depots An integer bigger than 0.
 */
DepotsMaplet.prototype.setTotalDepots = function (depots) {
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
DepotsMaplet.prototype.getTotalDepots = function () {
  return this._totalDepots;
};

/**
 * Return the number of selected depots.
 * @returns {number|*}
 */
DepotsMaplet.prototype.getSelectedDepots = function () {
  return this._selectedDepots;
};

/**
 * Recalculate the number of _selectedDepots according to the _activeCircle.
 * @private
 */
DepotsMaplet.prototype._recalculate = function () {
  this._selectedDepots = Math.round(this._activeCircle * this._totalDepots / 100);
  this.emitEvent(DepotsMaplet.Events.DEPOTS_CHANGE, [this._selectedDepots]);
};