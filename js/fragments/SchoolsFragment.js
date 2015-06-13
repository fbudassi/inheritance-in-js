'use strict';

/**
 * Schools Fragment.
 */
function SchoolsFragment(name, activeCircle, totalSchools) {
  CircleFragment.call(this, name, activeCircle); // Call parent's constructor.
  this.setTotalSchools(totalSchools);
}

SchoolsFragment.prototype = Object.create(CircleFragment.prototype);
SchoolsFragment.prototype.constructor = SchoolsFragment;

// Constructor Constants.
SchoolsFragment.DEFAULT_TOTAL_SCHOOLS = 70;
SchoolsFragment.DEFAULT_ACTIVE_CIRCLE = 50;
SchoolsFragment.Events = {
  SCHOOLS_CHANGE: "schoolsChange"
};

// Freeze object to prevent accidental changes.
Utils.deepFreeze(SchoolsFragment);

/**
 * Set the total number of schools.
 * @param schools An integer bigger than 0.
 */
SchoolsFragment.prototype.setTotalSchools = function (schools) {
  if (typeof schools !== 'number' || (schools % 1) !== 0 || schools < 0) {
    console.error("Number of schools is invalid.");
    return;
  }

  this._totalSchools = schools;
  this._recalculate();
};

/**
 * Return the _totalSchools;
 * @returns {*}
 */
SchoolsFragment.prototype.getTotalSchools = function () {
  return this._totalSchools;
};

/**
 * Return the number of selected schools.
 * @returns {number|*}
 */
SchoolsFragment.prototype.getSelectedSchools = function () {
  return this._selectedSchools;
};

/**
 * Recalculate the number of _selectedSchools according to the _activeCircle.
 * @private
 */
SchoolsFragment.prototype._recalculate = function () {
  this._selectedSchools = Math.round(this._activeCircle * this._totalSchools / 100);
  this.emitEvent(SchoolsFragment.Events.SCHOOLS_CHANGE, [this._selectedSchools]);
};