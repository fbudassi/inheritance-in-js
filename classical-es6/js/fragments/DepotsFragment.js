'use strict';

/**
 * Depots Fragment.
 */
class DepotsFragment extends CircleFragment {
  constructor(name, activeCircle, totalDepots) {
    super(name, activeCircle); // Call parent's constructor.
    this.setTotalDepots(totalDepots);
  }

  /**
   * Set the total number of depots.
   * @param depots An integer bigger than 0.
   */
  setTotalDepots(depots) {
    if (typeof depots !== 'number' || (depots % 1) !== 0 || depots < 0) {
      console.error("Number of depots is invalid.");
      return;
    }

    this._totalDepots = depots;
    this._recalculate();
  }

  /**
   * Return the _totalDepots;
   * @returns {*}
   */
  getTotalDepots() {
    return this._totalDepots;
  }

  /**
   * Return the number of selected depots.
   * @returns {number|*}
   */
  getSelectedDepots() {
    return this._selectedDepots;
  }

  /**
   * Recalculate the number of _selectedDepots according to the _activeCircle.
   * @private
   */
  _recalculate() {
    this._selectedDepots = Math.round(this._activeCircle * this._totalDepots / 100);
    this.emitEvent(DepotsFragment.Events.DEPOTS_CHANGE, [this._selectedDepots]);
  }
}

// Class Constants.
DepotsFragment.DEFAULT_TOTAL_DEPOTS = 40;
DepotsFragment.DEFAULT_ACTIVE_CIRCLE = 50;

DepotsFragment.Events = {
  DEPOTS_CHANGE: "depotsChange"
};

// Freeze class to prevent accidental changes.
Util.deepFreeze(DepotsFragment);
