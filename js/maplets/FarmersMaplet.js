'use strict';

/**
 * Farmers Maplet.
 */
function FarmersMaplet(name, totalFarmers, hectaresPerFarmer, depotsMaplet, schoolsMaplet) {
  Maplet.call(this, name); // Call parent's constructor.

  // Set default initial values.
  this.setTotalFarmers(totalFarmers);
  this.setHectaresPerFarmer(hectaresPerFarmer);
  this.setDepots(depotsMaplet.getSelectedDepots());
  this.setSchools(schoolsMaplet.getSelectedSchools());

  // Register listeners to other maplets.
  var that = this;
  depotsMaplet.addListener(DepotsMaplet.Events.DEPOTS_CHANGE, function (value) {
    that.setDepots(value);
  });
  schoolsMaplet.addListener(SchoolsMaplet.Events.SCHOOLS_CHANGE, function (value) {
    that.setSchools(value);
  });
}

FarmersMaplet.prototype = Object.create(Maplet.prototype);
FarmersMaplet.prototype.constructor = FarmersMaplet;

// Constructor Constants.
FarmersMaplet.FARMERS_PER_SCHOOL = 20;
FarmersMaplet.FARMERS_PER_DEPOT = 50;
FarmersMaplet.DEFAULT_TOTAL_FARMERS = 1000;
FarmersMaplet.DEFAULT_HECTARES_PER_FARMER = 1.8;
FarmersMaplet.Events = {
  FARMERS_CHANGE: "farmersChange",
  TOTAL_HECTARES_CHANGE: "totalHectaresChange"
};

/**
 * Set the total number of farmers.
 * @param farmers An integer bigger than 0.
 */
FarmersMaplet.prototype.setTotalFarmers = function (farmers) {
  if (typeof farmers !== 'number' || (farmers % 1) !== 0 || farmers < 0) {
    console.error("Number of totalFarmers is invalid.");
    return;
  }

  this._totalFarmers = farmers;
  this._recalculateSelectedFarmers();
};

/**
 * Return the _totalFarmers.
 * @returns {number|*}
 */
FarmersMaplet.prototype.getTotalFarmers = function () {
  return this._totalFarmers;
};

/**
 * Set the number of hectares per farmer.
 * @param hectaresPerFarmer A number bigger than 0.
 */
FarmersMaplet.prototype.setHectaresPerFarmer = function (hectaresPerFarmer) {
  if (typeof hectaresPerFarmer !== 'number' || hectaresPerFarmer < 0) {
    console.error("Number of hectaresPerFarmer is invalid.");
    return;
  }

  this._hectaresPerFarmer = hectaresPerFarmer;
  this._recalculateTotalHectares();
};

/**
 * Return the _hectaresPerFarmer.
 * @returns {number|*}
 */
FarmersMaplet.prototype.getHectaresPerFarmer = function () {
  return this._hectaresPerFarmer;
};

/**
 * Set the number of selected depots.
 * @param depots
 */
FarmersMaplet.prototype.setDepots = function (depots) {
  if (typeof depots !== 'number' || (depots % 1) !== 0 || depots < 0) {
    console.error("Number of depots is invalid.");
    return;
  }

  this._depots = depots;
  this._recalculateSelectedFarmers();
};

/**
 * Set the number of selected schools.
 * @param schools
 */
FarmersMaplet.prototype.setSchools = function (schools) {
  if (typeof schools !== 'number' || (schools % 1) !== 0 || schools < 0) {
    console.error("Number of schools is invalid.");
    return;
  }

  this._schools = schools;
  this._recalculateSelectedFarmers();
};

/**
 * Return the total number of hectares.
 * @returns {number|*}
 */
FarmersMaplet.prototype.getTotalHectares = function () {
  return this._totalHectares;
};

/**
 * Recalculate the number of _selectedFarmers based on the depots and schools.
 * If result is bigger than _totalFarmers, limit it to this value.
 * @private
 */
FarmersMaplet.prototype._recalculateSelectedFarmers = function () {
  if (typeof this._depots !== "number" || typeof this._schools !== "number" || typeof this._totalFarmers !== "number") {
    return;
  }

  var farmersPerDepots = Math.min(this._depots * FarmersMaplet.FARMERS_PER_DEPOT, this._totalFarmers);
  var farmersPerSchools = Math.min(this._schools * FarmersMaplet.FARMERS_PER_SCHOOL, this._totalFarmers);
  this._selectedFarmers = Math.round((farmersPerDepots + farmersPerSchools) / 2);
  this.emitEvent(FarmersMaplet.Events.FARMERS_CHANGE, [this._selectedFarmers]);

  // Selected farmers affects the total number of hectares.
  this._recalculateTotalHectares();
};

/**
 * Recalculate the number of _totalHecters based on the _selectedFarmers and _hectaresPerFarmer.
 * @private
 */
FarmersMaplet.prototype._recalculateTotalHectares = function () {
  if (typeof this._selectedFarmers !== "number" || typeof this._hectaresPerFarmer !== "number") {
    return;
  }

  this._totalHectares = Math.round(this._selectedFarmers * this._hectaresPerFarmer * 100) / 100;
  this.emitEvent(FarmersMaplet.Events.TOTAL_HECTARES_CHANGE, [this._totalHectares]);
};