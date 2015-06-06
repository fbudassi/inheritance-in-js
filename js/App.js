'use strict';

/**
 * App Main Class. It extends EventEmitter to let the class fire events and react to them.
 */
function App(fields) {
  EventEmitter.call(this); // Call parent's constructor.
  this._fields = fields; // UI field references.
  this._initMaplets();
  this._registerMapletsListeners();
  this._registerUiListeners();
  this._loadValuesAndDefaults();
}

App.prototype = Object.create(EventEmitter.prototype);
App.prototype.constructor = App;

/**
 * Create and initialize all the maplets that the app is going to use.
 * @private
 */
App.prototype._initMaplets = function () {
  this._depotsMaplet = new DepotsMaplet("Depots Maplet", DepotsMaplet.DEFAULT_ACTIVE_CIRCLE, DepotsMaplet.DEFAULT_TOTAL_DEPOTS);
  this._schoolsMaplet = new SchoolsMaplet("Schools Maplet", SchoolsMaplet.DEFAULT_ACTIVE_CIRCLE, SchoolsMaplet.DEFAULT_TOTAL_SCHOOLS);
  this._agriculturalMaplet = new AgriculturalMaplet("Agricultural Maplet", AgriculturalMaplet.Crops.MAIZE.id);
  this._farmersMaplet = new FarmersMaplet("Farmers Maplet", FarmersMaplet.DEFAULT_TOTAL_FARMERS, FarmersMaplet.DEFAULT_HECTARES_PER_FARMER, this._depotsMaplet, this._schoolsMaplet);
  this._financialMaplet = new FinancialMaplet("Financial Maplet", this._farmersMaplet, this._agriculturalMaplet);
};

/**
 * Register listeners to events coming out of the maplets.
 * @private
 */
App.prototype._registerMapletsListeners = function () {
  // Save reference to "this" due to javascript's weak design.
  var that = this;

  this._depotsMaplet.addListener(DepotsMaplet.Events.DEPOTS_CHANGE, function (value) {
    that._fields.selectedDepots.val(value);
  });

  this._schoolsMaplet.addListener(SchoolsMaplet.Events.SCHOOLS_CHANGE, function (value) {
    that._fields.selectedSchools.val(value);
  });

  this._agriculturalMaplet.addListener(AgriculturalMaplet.Events.PRICE_PER_KG_CHANGE, function (value) {
    that._fields.pricePerKg.val(value);
  });
  this._agriculturalMaplet.addListener(AgriculturalMaplet.Events.KG_PER_HECTARE_CHANGE, function (value) {
    that._fields.kgPerHectare.val(value);
  });

  this._farmersMaplet.addListener(FarmersMaplet.Events.TOTAL_HECTARES_CHANGE, function (value) {
    that._fields.totalHectares.val(value);
  });
  this._farmersMaplet.addListener(FarmersMaplet.Events.FARMERS_CHANGE, function (value) {
    that._fields.selectedFarmers.val(value);
  });

  this._financialMaplet.addListener(FinancialMaplet.Events.MONEY_PER_HECTARE_CHANGE, function (value) {
    that._fields.moneyPerHectare.val(value);
  });
  this._financialMaplet.addListener(FinancialMaplet.Events.TOTAL_AMOUNT_CHANGE, function (value) {
    that._fields.totalAmount.val(value);
  });
};

/**
 * Register listeners to events coming from the UI.
 * @private
 */
App.prototype._registerUiListeners = function () {
  // Save reference to "this" due to javascript's weak design.
  var that = this;

  this._fields.activeCircleDepots.change(function () {
    that._depotsMaplet.setActiveCircle(Number(that._fields.activeCircleDepots.val()));
  });
  this._fields.totalDepots.change(function () {
    that._depotsMaplet.setTotalDepots(Number(that._fields.totalDepots.val()));
  });

  this._fields.activeCircleSchools.change(function () {
    that._schoolsMaplet.setActiveCircle(Number(that._fields.activeCircleSchools.val()));
  });
  this._fields.totalSchools.change(function () {
    that._schoolsMaplet.setTotalSchools(Number(that._fields.totalSchools.val()));
  });

  this._fields.cropType.change(function () {
    that._agriculturalMaplet.setCrop(that._fields.cropType.val());
  });
  this._fields.pricePerKg.change(function () {
    that._agriculturalMaplet.setPricePerKg(Number(that._fields.pricePerKg.val()));
  });
  this._fields.kgPerHectare.change(function () {
    that._agriculturalMaplet.setKgPerHectare(Number(that._fields.kgPerHectare.val()));
  });

  this._fields.totalFarmers.change(function () {
    that._farmersMaplet.setTotalFarmers(Number(that._fields.totalFarmers.val()));
  });
  this._fields.hectaresPerFarmer.change(function () {
    that._farmersMaplet.setHectaresPerFarmer(Number(that._fields.hectaresPerFarmer.val()));
  });
};

/**
 * Load options into comboboxes and default values into the different fields.
 * Also trigger the change() event to update the dependant fields in the UI.
 * @private
 */
App.prototype._loadValuesAndDefaults = function () {
  for (var crop in AgriculturalMaplet.Crops) {
    if (AgriculturalMaplet.Crops.hasOwnProperty(crop)) {
      this._fields.cropType.append($('<option>', {
        value: crop,
        text: AgriculturalMaplet.Crops[crop].name
      }));
    }
  }

  this._fields.totalDepots.val(this._depotsMaplet.getTotalDepots()).change();
  this._fields.activeCircleDepots.val(this._depotsMaplet.getActiveCircle()).change();

  this._fields.totalSchools.val(this._schoolsMaplet.getTotalSchools()).change();
  this._fields.activeCircleSchools.val(this._schoolsMaplet.getActiveCircle()).change();

  this._fields.cropType.val(this._agriculturalMaplet.getCrop().id).change();

  this._fields.totalFarmers.val(this._farmersMaplet.getTotalFarmers()).change();
  this._fields.hectaresPerFarmer.val(this._farmersMaplet.getHectaresPerFarmer()).change();
};