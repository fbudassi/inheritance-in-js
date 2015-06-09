'use strict';

/**
 * Schools Maplet.
 */
function SchoolsMaplet(name, activeCircle, totalSchools) {
  CircleMaplet.call(this, name, activeCircle); // Call parent's constructor.
  this.setTotalSchools(totalSchools);
}

SchoolsMaplet.prototype = Object.create(CircleMaplet.prototype);
SchoolsMaplet.prototype.constructor = SchoolsMaplet;

// Constructor Constants.
SchoolsMaplet.DEFAULT_TOTAL_SCHOOLS = 70;
SchoolsMaplet.DEFAULT_ACTIVE_CIRCLE = 50;
SchoolsMaplet.Events = {
  SCHOOLS_CHANGE: "schoolsChange"
};

// Freeze object to prevent accidental changes.
utils.deepFreeze(SchoolsMaplet);

/**
 * Set the total number of schools.
 * @param schools An integer bigger than 0.
 */
SchoolsMaplet.prototype.setTotalSchools = function (schools) {
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
SchoolsMaplet.prototype.getTotalSchools = function () {
  return this._totalSchools;
};

/**
 * Return the number of selected schools.
 * @returns {number|*}
 */
SchoolsMaplet.prototype.getSelectedSchools = function () {
  return this._selectedSchools;
};

/**
 * Recalculate the number of _selectedSchools according to the _activeCircle.
 * @private
 */
SchoolsMaplet.prototype._recalculate = function () {
  this._selectedSchools = Math.round(this._activeCircle * this._totalSchools / 100);
  this.emitEvent(SchoolsMaplet.Events.SCHOOLS_CHANGE, [this._selectedSchools]);
};