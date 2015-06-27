'use strict';

/**
 * Fragment Base. It extends EventEmitter to let fragments fire events and react to them.
 */
class Fragment extends EventEmitter {
  constructor(name) {
    super(); // Always must be called in derived classes.
    this._name = name;
  }

  /**
   * Returns Fragment _name.
   * @returns {*}
   */
  getName() {
    return this._name;
  }

  /**
   * Override Object toString.
   * @returns {*}
   */
  toString() {
    return "Fragment Name: " + this._name;
  }
}