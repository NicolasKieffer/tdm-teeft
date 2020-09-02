/**
 * @prettier
 */
'use strict';

/**
 * @constructs Filter
 * @example <caption>Example usage of 'contructor' (with paramters)</caption>
 * let options = {
 *   // Will allow to assign a 'value' depending on the length of indexed text (nb of tokens)
 *   'lengthSteps': {
 *     'values': [ // store intermediate steps here,
 *       { // here : value '4' will be used for text length > 1000 tokens && text length <= 3000 tokens
 *         'lim': 3000, // 'this property must be > 'lengthSteps.min.lim' && must be < 'lengthSteps.max.lim'
 *         'value': 4
 *       },
 *       { // here : value '5' will be used for text length > 3000 tokens && text length <= 4000 tokens
 *         'lim': 4000, // 'this property must be > 'lengthSteps.min.lim' && must be < 'lengthSteps.max.lim'
 *         'value': 5
 *       }
 *     ],
 *     'min': { // 'value' depending of minimum 'lim' length of text (here : value '1' will be used for text length <= 1000 tokens)
 *       'lim': 1000,
 *       'value': 1
 *     },
 *     'max': { // 'value' depending of maximum 'lim' length of text (here : value '7' will be used for text length > 6000 tokens)
 *       'lim': 6000,
 *       'value': 7
 *     }
 *   },
 *   'minOccur': 3, // Minimal number of occurence (of tokens) used by default : here 3. This value will be updated depending on the length of indexed text when 'configure' function is called
 *   'noLimitStrength': 2 //
 *   },
 *   defaultFilter = new Filter(options);
 * // returns an instance of Filter with properties :
 * // - minOccur : 3
 * // - noLimitStrength : 2
 * // - lengthSteps : {'values': [{'lim': 3000, 'value': 4}, {'lim': 4000, 'value': 5}], 'min': {'lim': 1000, 'value': 1}, 'max': {'lim': 6000, 'value': 7}
 * @example <caption>Example usage of 'contructor' (with default values)</caption>
 * let defaultFilter = new Filter();
 * // returns an instance of Filter with properties :
 * // - minOccur : 7
 * // - noLimitStrength : 2
 * // - lengthSteps : {'values': [{'lim': 3000, 'value': 4}], 'min': {'lim': 1000, 'value': 1}, 'max': {'lim': 6000, 'value': 7}
 * @param {Object} [options] - Options of constructor
 * @param {Number} [options.minOccur] - Number of minimal occurence
 * @param {Number} [options.noLimitStrength] - Strength limit
 * @param {Number} [options.lengthSteps] - Steps length
 * @returns {Filter} - An instance of Filter
 */
const Filter = function (options) {
  this.minOccur = options && options.minOccur ? options.minOccur : Filter.DEFAULT.minOccur;
  this.noLimitStrength = options && options.noLimitStrength ? options.noLimitStrength : Filter.DEFAULT.noLimitStrength;
  this.lengthSteps = options && options.lengthSteps ? options.lengthSteps : Filter.DEFAULT.lengthSteps;
  return this;
};

// Default values
Filter.DEFAULT = {
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
 * @example <caption>Example usage of 'call' function</caption>
 * let defaultFilter = new Filter();
 * defaultFilter.configure(500);
 * defaultFilter.call(1, 1); // returns true
 * defaultFilter.configure(5000);
 * defaultFilter.call(1, 1); // returns false
 * @param {Number} occur - Occurence value
 * @param {Number} strength - Strength value
 * @returns {Boolean} Return true if conditions are respected
 */
Filter.prototype.call = function (occur, strength) {
  return (strength < this.noLimitStrength && occur >= this.minOccur) || strength >= this.noLimitStrength;
};

/**
 * Configure the filter depending of lengthSteps
 * @example <caption>Example usage of 'configure' function</caption>
 * let defaultFilter = new Filter();
 * defaultFilter.configure(500); // returns 1
 * defaultFilter.configure(5000); // returns 7
 * defaultFilter.configure('test'); // returns null
 * @param {Number} length - Text length
 * @returns {Number} Return configured minOccur value
 */
Filter.prototype.configure = function (length) {
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

module.exports = Filter;
