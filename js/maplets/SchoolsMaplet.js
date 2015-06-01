'use strict';

/**
 * Schools Maplet.
 */
var SchoolsMaplet = Class(CircleMaplet, {
  $statics: {
    DEFAULT_TOTAL_SCHOOLS: 70,
    DEFAULT_ACTIVE_CIRCLE: 50,
    Events: {
      SCHOOLS_CHANGE: "schoolsChange"
    }
  },

  constructor: function (name, activeCircle, totalSchools) {
    this.setTotalSchools(totalSchools);
    SchoolsMaplet.$super.call(this, name, activeCircle); // Call parent's constructor.
  },

  /**
   * Set the total number of schools.
   * @param schools An integer bigger than 0.
   */
  setTotalSchools: function (schools) {
    if (typeof schools !== 'number' || (schools % 1) !== 0 || schools < 0) {
      console.error("Number of schools is invalid.");
      return;
    }

    this._totalSchools = schools;
    this._recalculate();
  },

  /**
   * Return the _totalSchools;
   * @returns {*}
   */
  getTotalSchools: function () {
    return this._totalSchools;
  },

  /**
   * Return the number of selected schools.
   * @returns {number|*}
   */
  getSelectedSchools: function () {
    return this._selectedSchools;
  },

  /**
   * Recalculate the number of _selectedSchools according to the _activeCircle.
   * @private
   */
  _recalculate: function () {
    this._selectedSchools = Math.round(this._activeCircle * this._totalSchools / 100);
    this.emitEvent(SchoolsMaplet.Events.SCHOOLS_CHANGE, [this._selectedSchools]);
  }
});