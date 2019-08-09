/**
 * @prettier
 */
'use strict';

/**
 * @constructs DefaultFilter
 * @param {Object} [options] - Options of constructor
 * @param {Number} [options.minOccur] - Number of minimal occurence
 * @param {Number} [options.noLimitStrength] - Strength limit
 * @param {Number} [options.lengthSteps] - Steps length
 * @returns {DefaultFilter} - An instance of DefaultFilter
 */
const DefaultFilter = function(options) {
  this.minOccur = options && options.minOccur ? options.minOccur : DefaultFilter.DEFAULT.minOccur;
  this.noLimitStrength =
    options && options.noLimitStrength ? options.noLimitStrength : DefaultFilter.DEFAULT.noLimitStrength;
  this.lengthSteps = options && options.lengthSteps ? options.lengthSteps : DefaultFilter.DEFAULT.lengthSteps;
  return this;
};

// Default values
DefaultFilter.DEFAULT = {
  'lengthSteps': {
    'values': [
      {
        'lim': 3000,
        'value': 4
      }
    ],
    'min': {
      'lim': 1000,
      'value': 1
    },
    'max': {
      'lim': 6000,
      'value': 7
    }
  },
  'minOccur': 7,
  'noLimitStrength': 2
};

/**
 * Check values depending of filter conditions
 * @param {Number} occur - Occurence value
 * @param {Number} strength - Strength value
 * @return {Boolean} Return true if conditions are respected
 */
DefaultFilter.prototype.call = function(occur, strength) {
  return (strength < this.noLimitStrength && occur >= this.minOccur) || strength >= this.noLimitStrength;
};

/**
 * Configure the filter depending of lengthSteps
 * @param {Number} length - Text length
 * @return {Number} Return configured minOccur value
 */
DefaultFilter.prototype.configure = function(length) {
  if (!isNaN(length)) {
    if (length < this.lengthSteps.min.lim) {
      this.minOccur = this.lengthSteps.min.value;
      return this.minOccur;
    }
    for (let i = 0; i < this.lengthSteps.values.length; i++) {
      if (length < this.lengthSteps.values[i].lim) {
        this.minOccur = this.lengthSteps.values[i].value;
        return this.minOccur;
      }
    }
    this.minOccur = this.lengthSteps.max.value;
    return this.minOccur;
  }
  return null;
};

module.exports = DefaultFilter;
