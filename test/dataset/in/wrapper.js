/**
 * @prettier
 */
'use strict';

/* Module Require */

/* Module Require */
const Indexator = require('../../../src/indexator.js'),
  lexicon = require('../../../src/lexicon.js'),
  fs = require('fs');

const indexator = new Indexator();

/**
 * Wrapper of functions :
 */
const wrappers = {};

/**
 * - indexator
 *   - index()
 *   - tokenize()
 *   - translateTag()
 *   - sanitize()
 *   - lemmatize()
 */
wrappers.indexator = {
  'index': function(fn, item, cb) {
    fs.readFile(item.arguments.path, 'utf-8', function(err, res) {
      if (err) throw err;
      const result = fn(res);
      return cb(result.keywords);
    });
  },
  'tokenize': null,
  'translateTag': function(fn, item, cb) {
    // Get all tags in lexicon
    const tags = {};
    for (let key in lexicon) {
      tags[lexicon[key]] = true;
    }
    // Get all possible results with available tag in lexicon
    const results = {};
    for (let key in tags) {
      results[fn(key)] = true;
    }
    return cb(Object.keys(results));
  },
  'sanitize': function(fn, item, cb) {
    const value = fn(item.arguments),
      invalid = indexator.tagger.tag(indexator.SEPARATOR)[0],
      result = value.reduce(function(sum, current) {
        if (current.tag === invalid.tag) {
          return sum + 1;
        } else {
          return sum;
        }
      }, 0);
    return cb(result);
  },
  'lemmatize': null
};

/**
 * - tagger
 *   - tag()
 */

wrappers.tagger = {
  'tag': null
};

/**
 * - filter
 *   - configure()
 *   - call()
 */
wrappers.filter = {
  'configure': function(fn, item, cb) {
    let result = true;
    for (let i = 0; i < item.arguments.length; i++) {
      result = result && fn(item.arguments[i]) === item.values[i];
    }
    return cb(result);
  },
  'call': function(fn, item, cb) {
    return cb(fn(item.arguments.occur, item.arguments.length));
  }
};

/**
 * - extractor
 *   - extract()
 */
wrappers.extractor = {
  'extract': function(fn, item, cb) {
    const result = Object.keys(fn(item.arguments));
    return cb(result);
  }
};

module.exports = wrappers;
