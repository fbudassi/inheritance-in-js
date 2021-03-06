'use strict';

/**
 * Namespace used to store commonly used functions throughout the application.
 * @type {{}}
 */
var Util = {};

/**
 * To make an object fully immutable, freeze each object inside.
 * @param object
 */
Util.deepFreeze = function deepFreeze(object) {
  var prop, propKey;
  Object.freeze(object); // First freeze the object.
  for (propKey in object) {
    prop = object[propKey];
    if (!object.hasOwnProperty(propKey) || !(typeof prop === 'object') || Object.isFrozen(prop)) {
      // If the object is on the prototype, not an object, or is already frozen,
      // skip it. Note that this might leave an unfrozen reference somewhere in the
      // object if there is an already frozen object containing an unfrozen object.
      continue;
    }

    deepFreeze(prop); // Recursively call deepFreeze.
  }
};
