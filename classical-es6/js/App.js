'use strict';

/**
 * App Main Class. It extends EventEmitter to let the class fire events and react to them.
 */
class App extends EventEmitter {
  constructor(fields) {
    super(); // Always must be called in derived classes.
    this._fields = fields; // UI field references.
    this._initFragments();
    this._registerFragmentsListeners();
    this._registerUiListeners();
    this._loadValuesAndDefaults();
  }

  /**
   * Create and initialize all the fragments that the app is going to use.
   * @private
   */
  _initFragments() {
    this._depotsFragment = new DepotsFragment("Depots Fragment", DepotsFragment.DEFAULT_ACTIVE_CIRCLE, DepotsFragment.DEFAULT_TOTAL_DEPOTS);
    this._schoolsFragment = new SchoolsFragment("Schools Fragment", SchoolsFragment.DEFAULT_ACTIVE_CIRCLE, SchoolsFragment.DEFAULT_TOTAL_SCHOOLS);
    this._agriculturalFragment = new AgriculturalFragment("Agricultural Fragment", AgriculturalFragment.Crops.MAIZE.id);
    this._farmersFragment = new FarmersFragment("Farmers Fragment", FarmersFragment.DEFAULT_TOTAL_FARMERS, FarmersFragment.DEFAULT_HECTARES_PER_FARMER, this._depotsFragment, this._schoolsFragment);
    this._financialFragment = new FinancialFragment("Financial Fragment", this._farmersFragment, this._agriculturalFragment);
  }

  /**
   * Register listeners to events coming out of the fragments.
   * @private
   */
  _registerFragmentsListeners() {
    // Save reference to "this" due to javascript's weak design.
    let that = this;

    this._depotsFragment.addListener(DepotsFragment.Events.DEPOTS_CHANGE, function (value) {
      that._fields.selectedDepots.val(value);
    });

    this._schoolsFragment.addListener(SchoolsFragment.Events.SCHOOLS_CHANGE, function (value) {
      that._fields.selectedSchools.val(value);
    });

    this._agriculturalFragment.addListener(AgriculturalFragment.Events.PRICE_PER_KG_CHANGE, function (value) {
      that._fields.pricePerKg.val(value);
    });
    this._agriculturalFragment.addListener(AgriculturalFragment.Events.KG_PER_HECTARE_CHANGE, function (value) {
      that._fields.kgPerHectare.val(value);
    });

    this._farmersFragment.addListener(FarmersFragment.Events.TOTAL_HECTARES_CHANGE, function (value) {
      that._fields.totalHectares.val(value);
    });
    this._farmersFragment.addListener(FarmersFragment.Events.FARMERS_CHANGE, function (value) {
      that._fields.selectedFarmers.val(value);
    });

    this._financialFragment.addListener(FinancialFragment.Events.MONEY_PER_HECTARE_CHANGE, function (value) {
      that._fields.moneyPerHectare.val(value);
    });
    this._financialFragment.addListener(FinancialFragment.Events.TOTAL_AMOUNT_CHANGE, function (value) {
      that._fields.totalAmount.val(value);
    });
  }

  /**
   * Register listeners to events coming from the UI.
   * @private
   */
  _registerUiListeners() {
    // Save reference to "this" due to javascript's weak design.
    let that = this;

    this._fields.activeCircleDepots.change(function () {
      that._depotsFragment.setActiveCircle(Number(that._fields.activeCircleDepots.val()));
    });
    this._fields.totalDepots.change(function () {
      that._depotsFragment.setTotalDepots(Number(that._fields.totalDepots.val()));
    });

    this._fields.activeCircleSchools.change(function () {
      that._schoolsFragment.setActiveCircle(Number(that._fields.activeCircleSchools.val()));
    });
    this._fields.totalSchools.change(function () {
      that._schoolsFragment.setTotalSchools(Number(that._fields.totalSchools.val()));
    });

    this._fields.cropType.change(function () {
      that._agriculturalFragment.setCrop(that._fields.cropType.val());
    });
    this._fields.pricePerKg.change(function () {
      that._agriculturalFragment.setPricePerKg(Number(that._fields.pricePerKg.val()));
    });
    this._fields.kgPerHectare.change(function () {
      that._agriculturalFragment.setKgPerHectare(Number(that._fields.kgPerHectare.val()));
    });

    this._fields.totalFarmers.change(function () {
      that._farmersFragment.setTotalFarmers(Number(that._fields.totalFarmers.val()));
    });
    this._fields.hectaresPerFarmer.change(function () {
      that._farmersFragment.setHectaresPerFarmer(Number(that._fields.hectaresPerFarmer.val()));
    });
  }

  /**
   * Load options into comboboxes and default values into the different fields.
   * Also trigger the change() event to update the dependant fields in the UI.
   * @private
   */
  _loadValuesAndDefaults() {
    for (let crop in AgriculturalFragment.Crops) {
      if (AgriculturalFragment.Crops.hasOwnProperty(crop)) {
        this._fields.cropType.append($('<option>', {
          value: crop,
          text: AgriculturalFragment.Crops[crop].name
        }));
      }
    }

    this._fields.totalDepots.val(this._depotsFragment.getTotalDepots()).change();
    this._fields.activeCircleDepots.val(this._depotsFragment.getActiveCircle()).change();

    this._fields.totalSchools.val(this._schoolsFragment.getTotalSchools()).change();
    this._fields.activeCircleSchools.val(this._schoolsFragment.getActiveCircle()).change();

    this._fields.cropType.val(this._agriculturalFragment.getCrop().id).change();

    this._fields.totalFarmers.val(this._farmersFragment.getTotalFarmers()).change();
    this._fields.hectaresPerFarmer.val(this._farmersFragment.getHectaresPerFarmer()).change();
  }
}