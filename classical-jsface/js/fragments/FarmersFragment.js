'use strict';

/**
 * Farmers Fragment.
 */
var FarmersFragment = Class(Fragment, {
  $const: {
    FARMERS_PER_SCHOOL: 20,
    FARMERS_PER_DEPOT: 50,
    DEFAULT_TOTAL_FARMERS: 1000,
    DEFAULT_HECTARES_PER_FARMER: 1.8,
    Events: {
      FARMERS_CHANGE: "farmersChange",
      TOTAL_HECTARES_CHANGE: "totalHectaresChange"
    }
  },

  constructor: function (name, totalFarmers, hectaresPerFarmer, depotsFragment, schoolsFragment) {
    // Set default initial values.
    this.setTotalFarmers(totalFarmers);
    this.setHectaresPerFarmer(hectaresPerFarmer);
    this.setDepots(depotsFragment.getSelectedDepots());
    this.setSchools(schoolsFragment.getSelectedSchools());

    // Register listeners to other fragments.
    var that = this;
    depotsFragment.addListener(DepotsFragment.Events.DEPOTS_CHANGE, function (value) {
      that.setDepots(value);
    });
    schoolsFragment.addListener(SchoolsFragment.Events.SCHOOLS_CHANGE, function (value) {
      that.setSchools(value);
    });

    FarmersFragment.$super.call(this, name); // Call parent's constructor.
  },

  /**
   * Set the total number of farmers.
   * @param farmers An integer bigger than 0.
   */
  setTotalFarmers: function (farmers) {
    if (typeof farmers !== 'number' || (farmers % 1) !== 0 || farmers < 0) {
      console.error("Number of totalFarmers is invalid.");
      return;
    }

    this._totalFarmers = farmers;
    this._recalculateSelectedFarmers();
  },

  /**
   * Return the _totalFarmers.
   * @returns {number|*}
   */
  getTotalFarmers: function () {
    return this._totalFarmers;
  },

  /**
   * Set the number of hectares per farmer.
   * @param hectaresPerFarmer A number bigger than 0.
   */
  setHectaresPerFarmer: function (hectaresPerFarmer) {
    if (typeof hectaresPerFarmer !== 'number' || hectaresPerFarmer < 0) {
      console.error("Number of hectaresPerFarmer is invalid.");
      return;
    }

    this._hectaresPerFarmer = hectaresPerFarmer;
    this._recalculateTotalHectares();
  },

  /**
   * Return the _hectaresPerFarmer.
   * @returns {number|*}
   */
  getHectaresPerFarmer: function () {
    return this._hectaresPerFarmer;
  },

  /**
   * Set the number of selected depots.
   * @param depots
   */
  setDepots: function (depots) {
    if (typeof depots !== 'number' || (depots % 1) !== 0 || depots < 0) {
      console.error("Number of depots is invalid.");
      return;
    }

    this._depots = depots;
    this._recalculateSelectedFarmers();
  },

  /**
   * Set the number of selected schools.
   * @param schools
   */
  setSchools: function (schools) {
    if (typeof schools !== 'number' || (schools % 1) !== 0 || schools < 0) {
      console.error("Number of schools is invalid.");
      return;
    }

    this._schools = schools;
    this._recalculateSelectedFarmers();
  },

  /**
   * Return the total number of hectares.
   * @returns {number|*}
   */
  getTotalHectares: function () {
    return this._totalHectares;
  },

  /**
   * Recalculate the number of _selectedFarmers based on the depots and schools.
   * If result is bigger than _totalFarmers, limit it to this value.
   * @private
   */
  _recalculateSelectedFarmers: function () {
    if (typeof this._depots !== "number" || typeof this._schools !== "number" || typeof this._totalFarmers !== "number") {
      return;
    }

    var farmersPerDepots = Math.min(this._depots * FarmersFragment.FARMERS_PER_DEPOT, this._totalFarmers);
    var farmersPerSchools = Math.min(this._schools * FarmersFragment.FARMERS_PER_SCHOOL, this._totalFarmers);
    this._selectedFarmers = Math.round((farmersPerDepots + farmersPerSchools) / 2);
    this.emitEvent(FarmersFragment.Events.FARMERS_CHANGE, [this._selectedFarmers]);

    // Selected farmers affects the total number of hectares.
    this._recalculateTotalHectares();
  },

  /**
   * Recalculate the number of _totalHecters based on the _selectedFarmers and _hectaresPerFarmer.
   * @private
   */
  _recalculateTotalHectares: function () {
    if (typeof this._selectedFarmers !== "number" || typeof this._hectaresPerFarmer !== "number") {
      return;
    }

    this._totalHectares = Math.round(this._selectedFarmers * this._hectaresPerFarmer * 100) / 100;
    this.emitEvent(FarmersFragment.Events.TOTAL_HECTARES_CHANGE, [this._totalHectares]);
  }
});