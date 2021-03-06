'use strict';

/**
 * Financial Fragment.
 */
var FinancialFragment = Class(Fragment, {
  $const: {
    Events: {
      MONEY_PER_HECTARE_CHANGE: "moneyPerHectareChange",
      TOTAL_AMOUNT_CHANGE: "totalAmountChange"
    }
  },

  constructor: function (name, farmersFragment, agriculturalFragment) {
    // Set default initial values.
    this.setCropHectares(farmersFragment.getTotalHectares());
    this.setPricePerKg(agriculturalFragment.getPricePerKg());
    this.setKgPerHectare(agriculturalFragment.getKgPerHectare());

    // Register listeners to other fragments.
    var that = this;
    farmersFragment.addListener(FarmersFragment.Events.TOTAL_HECTARES_CHANGE, function (value) {
      that.setCropHectares(value);
    });
    agriculturalFragment.addListener(AgriculturalFragment.Events.PRICE_PER_KG_CHANGE, function (value) {
      that.setPricePerKg(value);
    });
    agriculturalFragment.addListener(AgriculturalFragment.Events.KG_PER_HECTARE_CHANGE, function (value) {
      that.setKgPerHectare(value);
    });

    FinancialFragment.$super.call(this, name); // Call parent's constructor.
  },

  /**
   * Set the total number of hectares.
   * @param cropHectares A number bigger than 0.
   */
  setCropHectares: function (cropHectares) {
    if (typeof cropHectares !== 'number' || cropHectares < 0) {
      console.error("Number of cropHectares is invalid.");
      return;
    }

    this._cropHectares = cropHectares;
    this._recalculateTotalAmount();
  },

  /**
   * Set the price per kg.
   * @param pricePerKg A number bigger than 0.
   */
  setPricePerKg: function (pricePerKg) {
    if (typeof pricePerKg !== 'number' || pricePerKg < 0) {
      console.error("Number of pricePerKg is invalid.");
      return;
    }

    this._pricePerKg = pricePerKg;
    this._recalculateMoneyPerHectare()
  },

  /**
   * Set the kg per hectare.
   * @param kgPerHectare A number bigger than 0.
   */
  setKgPerHectare: function (kgPerHectare) {
    if (typeof kgPerHectare !== 'number' || kgPerHectare < 0) {
      console.error("Number of kgPerHectare is invalid.");
      return;
    }

    this._kgPerHectare = kgPerHectare;
    this._recalculateMoneyPerHectare()
  },

  /**
   * Recalculate the number of _moneyPerHectare based on the pricePerKg and kgPerHectare.
   * @private
   */
  _recalculateMoneyPerHectare: function () {
    if (typeof this._pricePerKg !== "number" || typeof this._kgPerHectare !== "number") {
      return;
    }

    this._moneyPerHectare = Math.round(this._pricePerKg * this._kgPerHectare * 100) / 100;
    this.emitEvent(FinancialFragment.Events.MONEY_PER_HECTARE_CHANGE, [this._moneyPerHectare]);

    // Monet per hectare affects the total amount of money.
    this._recalculateTotalAmount();
  },

  /**
   * Recalculate the total amount of money.
   * @private
   */
  _recalculateTotalAmount: function () {
    if (typeof this._cropHectares !== "number" || typeof this._moneyPerHectare !== "number") {
      return;
    }

    this._totalAmount = Math.round(this._cropHectares * this._moneyPerHectare * 100) / 100;
    this.emitEvent(FinancialFragment.Events.TOTAL_AMOUNT_CHANGE, [this._totalAmount]);
  }
});