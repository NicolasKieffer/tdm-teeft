/**
 * @prettier
 */
'use strict';

/* Module Require */
const Tagger = require('./tagger.js'),
  DefaultFilter = require('./defaultfilter.js'),
  Indexator = require('./indexator.js'),
  TermExtraction = require('./termextractor.js');

const Teeft = {
  /* Constructor of Tagger */
  'Tagger': Tagger,
  /* Constructor of DefaultFilter */
  'DefaultFilter': DefaultFilter,
  /* Constructor of Indexator */
  'Indexator': Indexator,
  /* Constructor of TermExtraction */
  'TermExtraction': TermExtraction
};

module.exports = Teeft;
