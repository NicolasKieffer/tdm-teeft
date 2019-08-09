/**
 * @prettier
 */
'use strict';

/**
 * @constructs Tagger
 * @param {Object} [options] - Options of constructor
 * @returns {Tagger} - An instance of Tagger
 */
const Tagger = function(lexicon = {}) {
  this.lexicon = Object.create(null, {});
  // Set all keys
  for (let keys in lexicon) {
    this.lexicon[keys] = lexicon[keys];
  }
  return this;
};

/**
 * Tag terms
 * @param {Array} terms - List of terms
 * @return {Array} List of tagged terms
 */
Tagger.prototype.tag = function(terms = []) {
  let result = [];
  for (let i = 0; i < terms.length; i++) {
    const term = terms[i],
      tag = this.lexicon[term] ? this.lexicon[term] : 'NND';
    result.push({
      term: term,
      tag: tag
    });
  }
  return result;
};

module.exports = Tagger;
