/**
 * @prettier
 */
'use strict';

/**
 * @constructs Tagger
 * @example <caption>Example usage of 'contructor' (with paramters)</caption>
 * let lexicon = { ... },
 *   tagger = new Tagger(options);
 * // returns an instance of Tagger with custom lexion
 * @example <caption>Example usage of 'contructor' (with default values)</caption>
 * let tagger = new Tagger();
 * // returns an instance of Tagger with default lexion
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
 * @example <caption>Example usage of 'tag' function</caption>
 * let tagger = new Tagger();
 * tagger.tag(['this', 'is', 'a', 'test']); // return [{ 'term': 'this', 'tag': 'DT' }, { 'term': 'is', 'tag': 'VBZ' }, { 'term': 'a', 'tag': 'DT' }, { 'term': 'test', 'tag': 'NN' }]
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
