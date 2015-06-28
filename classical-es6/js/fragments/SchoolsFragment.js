'use strict';

/**
 * Schools Fragment.
 */
class SchoolsFragment extends CircleFragment {
  constructor(name, activeCircle, totalSchools) {
    super(name, activeCircle); // Call parent's constructor.
    this.setTotalSchools(totalSchools);
  }

  /**
   * Set the total number of schools.
   * @param schools An integer bigger than 0.
   */
  setTotalSchools(schools) {
    if (typeof schools !== 'number' || (schools % 1) !== 0 || schools < 0) {
      console.error("Number of schools is invalid.");
      return;
    }

    this._totalSchools = schools;
    this._recalculate();
  }

  /**
   * Return the _totalSchools;
   * @returns {*}
   */
  getTotalSchools() {
    return this._totalSchools;
  }

  /**
   * Return the number of selected schools.
   * @returns {number|*}
   */
  getSelectedSchools() {
    return this._selectedSchools;
  }

  /**
   * Recalculate the number of _selectedSchools according to the _activeCircle.
   * @private
   */
  _recalculate() {
    this._selectedSchools = Math.round(this._activeCircle * this._totalSchools / 100);
    this.emitEvent(SchoolsFragment.Events.SCHOOLS_CHANGE, [this._selectedSchools]);
  }
}

// Class Constants.
SchoolsFragment.DEFAULT_TOTAL_SCHOOLS = 70;
SchoolsFragment.DEFAULT_ACTIVE_CIRCLE = 50;
SchoolsFragment.Events = {
  SCHOOLS_CHANGE: "schoolsChange"
};

// Freeze class to prevent accidental changes.
Util.deepFreeze(SchoolsFragment);