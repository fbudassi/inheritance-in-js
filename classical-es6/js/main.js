'use strict';

// Initialize App.
let app = new App({
  totalDepots: $("#total-depots"),
  activeCircleDepots: $("#active-circle-depots"),
  selectedDepots: $("#selected-depots"),

  totalSchools: $("#total-schools"),
  activeCircleSchools: $("#active-circle-schools"),
  selectedSchools: $("#selected-schools"),

  cropType: $("#crop"),
  pricePerKg: $("#price-per-kg"),
  kgPerHectare: $("#kg-per-hectare"),

  totalFarmers: $("#total-farmers"),
  hectaresPerFarmer: $("#hectares-per-farmer"),
  selectedFarmers: $("#selected-farmers"),
  totalHectares: $("#total-hectares"),

  moneyPerHectare: $("#money-per-hectare"),
  totalAmount: $("#total-amount")
});