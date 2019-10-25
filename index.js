/**
 * @prettier
 */
'use strict';

/* Module Require */
const Tagger = require('./src/tagger.js'),
  Filter = require('./src/filter.js'),
  Indexator = require('./src/indexator.js'),
  TermExtraction = require('./src/termextractor.js');

const Teeft = {
  /* Constructor of Tagger */
  'Tagger': Tagger,
  /* Constructor of Filter */
  'Filter': Filter,
  /* Constructor of Indexator */
  'Indexator': Indexator,
  /* Constructor of TermExtraction */
  'TermExtraction': TermExtraction
};

module.exports = Teeft;
