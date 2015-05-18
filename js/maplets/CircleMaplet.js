/**
 * Common features inherited by DepotsMaplet and SchoolsMaplet.
 */
var CircleMaplet = Class(Maplet, {
  constructor: function (name, activeCircle) {
    this.setActiveCircle(activeCircle);
    CircleMaplet.$super.call(this, name); // Call parent's constructor.
  },

  /**
   * Set the active circle.
   * @param circle A number between 0 and 100.
   */
  setActiveCircle: function (circle) {
    if (typeof circle !== 'number' || circle < 0 || circle > 100) {
      console.error("Active circle is invalid.");
      return;
    }

    this._activeCircle = circle;
    this._recalculate();
  },

  /**
   * Return the _activeCircle;
   * @returns {*}
   */
  getActiveCircle: function () {
    return this._activeCircle;
  },

  /**
   * Must be implemented by inherited CircleMaplets.
   * @private
   */
  _recalculate: function () {
    console.error("This class is not meant to be instantiated.");
  }
});