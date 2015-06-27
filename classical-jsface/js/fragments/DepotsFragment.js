'use strict';

/**
 * Depots Fragment.
 */
var DepotsFragment = Class(CircleFragment, {
  $const: {
    DEFAULT_TOTAL_DEPOTS: 40,
    DEFAULT_ACTIVE_CIRCLE: 50,
    Events: {
      DEPOTS_CHANGE: "depotsChange"
    }
  },

  constructor: function (name, activeCircle, totalDepots) {
    this.setTotalDepots(totalDepots);
    DepotsFragment.$super.call(this, name, activeCircle); // Call parent's constructor.
  },

  /**
   * Set the total number of depots.
   * @param depots An integer bigger than 0.
   */
  setTotalDepots: function (depots) {
    if (typeof depots !== 'number' || (depots % 1) !== 0 || depots < 0) {
      console.error("Number of depots is invalid.");
      return;
    }

    this._totalDepots = depots;
    this._recalculate();
  },

  /**
   * Return the _totalDepots;
   * @returns {*}
   */
  getTotalDepots: function () {
    return this._totalDepots;
  },

  /**
   * Return the number of selected depots.
   * @returns {number|*}
   */
  getSelectedDepots: function () {
    return this._selectedDepots;
  },

  /**
   * Recalculate the number of _selectedDepots according to the _activeCircle.
   * @private
   */
  _recalculate: function () {
    this._selectedDepots = Math.round(this._activeCircle * this._totalDepots / 100);
    this.emitEvent(DepotsFragment.Events.DEPOTS_CHANGE, [this._selectedDepots]);
  }
});