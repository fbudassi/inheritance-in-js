'use strict';

/**
 * Agricultural Fragment.
 */
function AgriculturalFragment(name, crop) {
  Fragment.call(this, name); // Call parent's constructor.
  this.setCrop(crop);
}

AgriculturalFragment.prototype = Object.create(Fragment.prototype);
AgriculturalFragment.prototype.constructor = AgriculturalFragment;

// Constructor Constants.
AgriculturalFragment.Events = {
  PRICE_PER_KG_CHANGE: "pricePerKgChange",
  KG_PER_HECTARE_CHANGE: "kgPerHectareChange"
};

AgriculturalFragment.Crops = {
  MAIZE: {id: "MAIZE", name: "Maize", pricePerKg: 1.5, kgPerHectare: 1000},
  SORGHUM: {id: "SORGHUM", name: "Sorghum", pricePerKg: 1, kgPerHectare: 1500},
  TOBACCO: {id: "TOBACCO", name: "Tobacco", pricePerKg: 2, kgPerHectare: 500},
  GROUND_NUTS: {id: "GROUND_NUTS", name: "Ground Nuts", pricePerKg: 3, kgPerHectare: 330}
};

// Freeze object to prevent accidental changes.
Util.deepFreeze(AgriculturalFragment);

/**
 * Set crop type.
 * @param crop An integer bigger than 0.
 */
AgriculturalFragment.prototype.setCrop = function (crop) {
  if (AgriculturalFragment.Crops[crop] === undefined) {
    console.error("Crop type is invalid.");
    return;
  }

  this._crop = AgriculturalFragment.Crops[crop];

  // Set default values based on crop type.
  this.setPricePerKg(this._crop.pricePerKg);
  this.setKgPerHectare(this._crop.kgPerHectare);
};

/**
 * Return the _crop.
 * @returns {*}
 */
AgriculturalFragment.prototype.getCrop = function () {
  return this._crop;
};

/**
 * Set the pricePerKg.
 * @param pricePerKg A number bigger than 0.
 */
AgriculturalFragment.prototype.setPricePerKg = function (pricePerKg) {
  if (typeof pricePerKg !== 'number' || pricePerKg < 0) {
    console.error("Price per Kg is invalid.");
    return;
  }

  this._pricePerKg = pricePerKg;
  this.emitEvent(AgriculturalFragment.Events.PRICE_PER_KG_CHANGE, [this._pricePerKg]);
};

/**
 * Return the pricePerKg.
 * @returns {number|*}
 */
AgriculturalFragment.prototype.getPricePerKg = function () {
  return this._pricePerKg;
};

/**
 * Set the kgPerHectare.
 * @param kgPerHectare A number bigger than 0.
 */
AgriculturalFragment.prototype.setKgPerHectare = function (kgPerHectare) {
  if (typeof kgPerHectare !== 'number' || kgPerHectare < 0) {
    console.error("Kg per hectare is invalid.");
    return;
  }

  this._kgPerHectare = kgPerHectare;
  this.emitEvent(AgriculturalFragment.Events.KG_PER_HECTARE_CHANGE, [this._kgPerHectare]);
};

/**
 * Return the kgPerHectare.
 * @returns {number|*}
 */
AgriculturalFragment.prototype.getKgPerHectare = function () {
  return this._kgPerHectare;
};