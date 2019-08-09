/**
 * @prettier
 */
'use strict';

/* Module Require */
const pkg = require('../package.json'),
  Teeft = require('../src/indexator.js'),
  Tagger = require('../src/tagger.js'),
  lexicon = require('../src/lexicon.js'),
  DefaultFilter = require('../src/defaultfilter.js'),
  TermExtraction = require('../src/termextractor.js'),
  fs = require('fs'),
  Lemmatizer = require('javascript-lemmatizer'),
  TU = require('auto-tu');

// Test data
const dataset = {
  'indexator': require('./dataset/in/data/indexator.json'),
  'tagger': require('./dataset/in/data/tagger.json'),
  'filter': require('./dataset/in/data/filter.json'),
  'extractor': require('./dataset/in/data/extractor.json')
};

// Map of functions used in test
const wrapper = require('./dataset/in/wrapper.js');

// Tested object (only functions are "automatically" tested)
const myObject = {
  'indexator': new Teeft(),
  'tagger': new Tagger(lexicon),
  'filter': new DefaultFilter(),
  'extractor': new TermExtraction({
    'filter': new DefaultFilter()
  })
};

/**
 * Start test
 */

TU.start({
  'description': pkg.name + '/index.js',
  'root': 'Teeft',
  'object': myObject,
  'dataset': dataset,
  'wrapper': wrapper
});
