'use strict';

/**
 * Common features inherited by DepotsFragment and SchoolsFragment.
 */
class CircleFragment extends Fragment {
  constructor(name, activeCircle) {
    super(name); // Call parent's constructor.
    this.setActiveCircle(activeCircle);
  }

  /**
   * Set the active circle.
   * @param circle A number between 0 and 100.
   */
  setActiveCircle(circle) {
    if (typeof circle !== 'number' || circle < 0 || circle > 100) {
      console.error("Active circle is invalid.");
      return;
    }

    this._activeCircle = circle;
    this._recalculate();
  }

  /**
   * Return the _activeCircle;
   * @returns {*}
   */
  getActiveCircle() {
    return this._activeCircle;
  }

  /**
   * Must be implemented by inherited CircleFragments.
   * @private
   */
  _recalculate() {
    throw new Error("Method not implemented.");
  }
}