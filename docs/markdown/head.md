# tdm-teeft

**tdm-teeft** is a tdm module for terme exctraction of unstructured text. It can be used to get keywords of document.

## Installation

Using npm :

```shell
$ npm i -g tdm-teeft
$ npm i --save tdm-teeft
```

Using Node :

```js
/* require of Multicat module */
const Teeft = require('tdm-teeft');

/* Build new Instance of Tagger */
let tagger = new Multicat.Tagger();

/* Build new Instance of DefaultFilter */
let defaultfilter = new Multicat.DefaultFilter();

/* Build new Instance of Indexator */
let indexator = new Multicat.Indexator();

/* Build new Instance of TermExtraction */
let termextraction = new Multicat.TermExtraction();
```

## Launch tests

```shell
$ npm run test
```

## Build documentation

```shell
$ npm run docs
```

## API Documentation

