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
/* require of Teeft module */
const Teeft = require('tdm-teeft');

/* Build new Instance of Tagger */
let tagger = new Teeft.Tagger();

/* Build new Instance of Filter */
let filter = new Teeft.Filter();

/* Build new Instance of Indexator */
let indexator = new Teeft.Indexator();

/* Build new Instance of TermExtraction */
let termextraction = new Teeft.TermExtraction();
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

## Classes

<dl>
<dt><a href="#Filter">Filter</a></dt>
<dd></dd>
<dt><a href="#Indexator">Indexator</a></dt>
<dd></dd>
<dt><a href="#Tagger">Tagger</a></dt>
<dd></dd>
<dt><a href="#TermExtractor">TermExtractor</a></dt>
<dd></dd>
</dl>

<a name="Filter"></a>

## Filter
**Kind**: global class  

* [Filter](#Filter)
    * [new Filter([options])](#new_Filter_new)
    * [.call(occur, strength)](#Filter+call) ⇒ <code>Boolean</code>
    * [.configure(length)](#Filter+configure) ⇒ <code>Number</code>

<a name="new_Filter_new"></a>

### new Filter([options])
**Returns**: [<code>Filter</code>](#Filter) - - An instance of Filter  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Options of constructor |
| [options.minOccur] | <code>Number</code> | Number of minimal occurence |
| [options.noLimitStrength] | <code>Number</code> | Strength limit |
| [options.lengthSteps] | <code>Number</code> | Steps length |

**Example** *(Example usage of &#x27;contructor&#x27; (with paramters))*  
```js
let options = {
  // Will allow to assign a 'value' depending on the length of indexed text (nb of tokens)
  'lengthSteps': {
    'values': [ // store intermediate steps here,
      { // here : value '4' will be used for text length > 1000 tokens && text length <= 3000 tokens
        'lim': 3000, // 'this property must be > 'lengthSteps.min.lim' && must be < 'lengthSteps.max.lim'
        'value': 4
      },
      { // here : value '5' will be used for text length > 3000 tokens && text length <= 4000 tokens
        'lim': 4000, // 'this property must be > 'lengthSteps.min.lim' && must be < 'lengthSteps.max.lim'
        'value': 5
      }
    ],
    'min': { // 'value' depending of minimum 'lim' length of text (here : value '1' will be used for text length <= 1000 tokens)
      'lim': 1000,
      'value': 1
    },
    'max': { // 'value' depending of maximum 'lim' length of text (here : value '7' will be used for text length > 6000 tokens)
      'lim': 6000,
      'value': 7
    }
  },
  'minOccur': 3, // Minimal number of occurence (of tokens) used by default : here 3. This value will be updated depending on the length of indexed text when 'configure' function is called
  'noLimitStrength': 2 //
  },
  defaultFilter = new Filter(options);
// returns an instance of Filter with properties :
// - minOccur : 3
// - noLimitStrength : 2
// - lengthSteps : {'values': [{'lim': 3000, 'value': 4}, {'lim': 4000, 'value': 5}], 'min': {'lim': 1000, 'value': 1}, 'max': {'lim': 6000, 'value': 7}
```
**Example** *(Example usage of &#x27;contructor&#x27; (with default values))*  
```js
let defaultFilter = new Filter();
// returns an instance of Filter with properties :
// - minOccur : 7
// - noLimitStrength : 2
// - lengthSteps : {'values': [{'lim': 3000, 'value': 4}], 'min': {'lim': 1000, 'value': 1}, 'max': {'lim': 6000, 'value': 7}
```
<a name="Filter+call"></a>

### filter.call(occur, strength) ⇒ <code>Boolean</code>
Check values depending of filter conditions

**Kind**: instance method of [<code>Filter</code>](#Filter)  
**Returns**: <code>Boolean</code> - Return true if conditions are respected  

| Param | Type | Description |
| --- | --- | --- |
| occur | <code>Number</code> | Occurence value |
| strength | <code>Number</code> | Strength value |

**Example** *(Example usage of &#x27;call&#x27; function)*  
```js
let defaultFilter = new Filter();
defaultFilter.configure(500);
defaultFilter.call(1, 1); // returns true
defaultFilter.configure(5000);
defaultFilter.call(1, 1); // returns false
```
<a name="Filter+configure"></a>

### filter.configure(length) ⇒ <code>Number</code>
Configure the filter depending of lengthSteps

**Kind**: instance method of [<code>Filter</code>](#Filter)  
**Returns**: <code>Number</code> - Return configured minOccur value  

| Param | Type | Description |
| --- | --- | --- |
| length | <code>Number</code> | Text length |

**Example** *(Example usage of &#x27;configure&#x27; function)*  
```js
let defaultFilter = new Filter();
defaultFilter.configure(500); // returns 1
defaultFilter.configure(5000); // returns 7
defaultFilter.configure('test'); // returns null
```
<a name="Indexator"></a>

## Indexator
**Kind**: global class  

* [Indexator](#Indexator)
    * [new Indexator([options])](#new_Indexator_new)
    * _instance_
        * [.tokenize(text)](#Indexator+tokenize) ⇒ <code>Array</code>
        * [.translateTag(tag)](#Indexator+translateTag) ⇒ <code>String</code>
        * [.sanitize(terms)](#Indexator+sanitize) ⇒ <code>Array</code>
        * [.lemmatize(terms)](#Indexator+lemmatize) ⇒ <code>Array</code>
        * [.index(data)](#Indexator+index) ⇒ <code>Object</code>
    * _static_
        * [.compare(a, b)](#Indexator.compare) ⇒ <code>Number</code>

<a name="new_Indexator_new"></a>

### new Indexator([options])
**Returns**: [<code>Indexator</code>](#Indexator) - - An instance of Indexator  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Options of constructor |
| [options.filter] | [<code>Filter</code>](#Filter) | Options given to extractor of this instance of Indexator |
| [options.lexicon] | <code>Object</code> | Lexicon used by tagger of this instance of Indexator |
| [options.stopwords] | <code>Object</code> | Stopwords used by this instance of Indexator |
| [options.lemmatizer] | <code>Object</code> | Lemmatizer used by tagger of this instance of Indexator |
| [options.stemmer] | <code>Object</code> | Stemmer used by this instance of Indexator |
| [options.dictionary] | <code>Object</code> | Dictionnary used by this instance of Indexator |

**Example** *(Example usage of &#x27;contructor&#x27; (with paramters))*  
```js
let options = {
    'filter': customFilter // According customFilter contain your custom settings
  },
  indexator = new Indexator(options);
// returns an instance of Indexator with custom Filter
```
**Example** *(Example usage of &#x27;contructor&#x27; (with default values))*  
```js
let indexator = new Indexator();
// returns an instance of Indexator with default options
```
<a name="Indexator+tokenize"></a>

### indexator.tokenize(text) ⇒ <code>Array</code>
Extract token from a text

**Kind**: instance method of [<code>Indexator</code>](#Indexator)  
**Returns**: <code>Array</code> - Array of tokens  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | Fulltext |

**Example** *(Example usage of &#x27;tokenize&#x27; function)*  
```js
let indexator = new Indexator();
indexator.tokenize('my sample sentence'); // return ['my', 'sample', 'sentence']
```
<a name="Indexator+translateTag"></a>

### indexator.translateTag(tag) ⇒ <code>String</code>
Translate the tag of Tagger to Lemmatizer

**Kind**: instance method of [<code>Indexator</code>](#Indexator)  
**Returns**: <code>String</code> - Tag who match with a Lemmatizer tag (or false)  

| Param | Type | Description |
| --- | --- | --- |
| tag | <code>String</code> | Tag given by Tagger |

**Example** *(Example usage of &#x27;translateTag&#x27; function)*  
```js
let indexator = new Indexator();
indexator.translateTag(RB); // return 'adv';
indexator.translateTag(JJ); // return 'adj';
indexator.translateTag(NN); // return 'noun';
indexator.translateTag(NNP); // return 'noun';
indexator.translateTag(VBG); // return 'verb';
indexator.translateTag(VBN); // return 'verb';
```
<a name="Indexator+sanitize"></a>

### indexator.sanitize(terms) ⇒ <code>Array</code>
Sanitize list of terms (with some filter)

**Kind**: instance method of [<code>Indexator</code>](#Indexator)  
**Returns**: <code>Array</code> - Liste of sanitized terms  

| Param | Type | Description |
| --- | --- | --- |
| terms | <code>Array</code> | List of terms |

**Example** *(Example usage of &#x27;sanitize&#x27; function)*  
```js
let indexator = new Indexator();
indexator.sanitize([ { term: 'this', tag: 'DT', lemma: 'this', stem: 'this' },
  { term: 'is', tag: 'VBZ' },
  { term: 'a', tag: 'DT' },
  { term: 'sample', tag: 'NN', lemma: 'sample', stem: 'sampl' },
  { term: 'test', tag: 'NN', lemma: 'test', stem: 'test' } ]);
// return [ { term: 'this', tag: 'DT', lemma: 'this', stem: 'this' },
//   { term: '#', tag: '#' },
//   { term: '#', tag: '#' },
//   { term: 'sample', tag: 'NN', lemma: 'sample', stem: 'sampl' },
//   { term: 'test', tag: 'NN', lemma: 'test', stem: 'test' } ]
```
<a name="Indexator+lemmatize"></a>

### indexator.lemmatize(terms) ⇒ <code>Array</code>
Lemmatize a list of tagged terms (add a property lemma & stem)

**Kind**: instance method of [<code>Indexator</code>](#Indexator)  
**Returns**: <code>Array</code> - List of tagged terms with a lemma  

| Param | Type | Description |
| --- | --- | --- |
| terms | <code>Array</code> | List of tagged terms |

**Example** *(Example usage of &#x27;translateTag&#x27; function)*  
```js
let indexator = new Indexator();
indexator.lemmatize([ { term: 'this', tag: 'DT', lemma: 'this', stem: 'this' },
  { term: 'is', tag: 'VBZ' },
  { term: 'a', tag: 'DT' },
  { term: 'sample', tag: 'NN', lemma: 'sample', stem: 'sampl' },
  { term: 'test', tag: 'NN', lemma: 'test', stem: 'test' } ]);
// return [ { term: 'this', tag: 'DT', lemma: 'this', stem: 'this' },
//   { term: '#', tag: '#' },
//   { term: '#', tag: '#' },
//   { term: 'sample', tag: 'NN', lemma: 'sample', stem: 'sampl' },
//   { term: 'test', tag: 'NN', lemma: 'test', stem: 'test' } ]
```
<a name="Indexator+index"></a>

### indexator.index(data) ⇒ <code>Object</code>
Index a fulltext

**Kind**: instance method of [<code>Indexator</code>](#Indexator)  
**Returns**: <code>Object</code> - Return a representation of fulltext (indexation & more informations/statistics about tokens/terms)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> | Fulltext who need to be indexed |

**Example** *(Example usage of &#x27;translateTag&#x27; function)*  
```js
let indexator = new Indexator();
indexator.index('This is a sample sentence'); // return an object representation of indexation
```
<a name="Indexator.compare"></a>

### Indexator.compare(a, b) ⇒ <code>Number</code>
Compare the specificity of two objects between them

**Kind**: static method of [<code>Indexator</code>](#Indexator)  
**Returns**: <code>Number</code> - -1, 1, or 0  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Object</code> | First object |
| b | <code>Object</code> | Second object |

**Example** *(Example usage of &#x27;compare&#x27; function)*  
```js
Indexator.compare({ 'term': 'a', 'specificity': 1 }, { 'term': 'b', 'specificity': 2 }); // return 1
Indexator.compare({ 'term': 'a', 'specificity': 1 }, { 'term': 'b', 'specificity': 1 }); // return 0
Indexator.compare({ 'term': 'a', 'specificity': 2 }, { 'term': 'b', 'specificity': 1 }); // return -1
```
<a name="Tagger"></a>

## Tagger
**Kind**: global class  

* [Tagger](#Tagger)
    * [new Tagger([options])](#new_Tagger_new)
    * [.tag(terms)](#Tagger+tag) ⇒ <code>Array</code>

<a name="new_Tagger_new"></a>

### new Tagger([options])
**Returns**: [<code>Tagger</code>](#Tagger) - - An instance of Tagger  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Options of constructor |

**Example** *(Example usage of &#x27;contructor&#x27; (with paramters))*  
```js
let lexicon = { ... },
  tagger = new Tagger(options);
// returns an instance of Tagger with custom lexion
```
**Example** *(Example usage of &#x27;contructor&#x27; (with default values))*  
```js
let tagger = new Tagger();
// returns an instance of Tagger with default lexion
```
<a name="Tagger+tag"></a>

### tagger.tag(terms) ⇒ <code>Array</code>
Tag terms

**Kind**: instance method of [<code>Tagger</code>](#Tagger)  
**Returns**: <code>Array</code> - List of tagged terms  

| Param | Type | Description |
| --- | --- | --- |
| terms | <code>Array</code> | List of terms |

**Example** *(Example usage of &#x27;tag&#x27; function)*  
```js
let tagger = new Tagger();
tagger.tag(['this', 'is', 'a', 'test']); // return [{ 'term': 'this', 'tag': 'DT' }, { 'term': 'is', 'tag': 'VBZ' }, { 'term': 'a', 'tag': 'DT' }, { 'term': 'test', 'tag': 'NN' }]
```
<a name="TermExtractor"></a>

## TermExtractor
**Kind**: global class  

* [TermExtractor](#TermExtractor)
    * [new TermExtractor([options])](#new_TermExtractor_new)
    * [.extract(taggedTerms)](#TermExtractor+extract) ⇒ <code>Object</code>
    * [._startsWith(str, prefix)](#TermExtractor+_startsWith) ⇒ <code>Boolean</code>

<a name="new_TermExtractor_new"></a>

### new TermExtractor([options])
**Returns**: [<code>TermExtractor</code>](#TermExtractor) - - An instance of TermExtractor  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Options of constructor |
| [options.tagger] | [<code>Tagger</code>](#Tagger) | An instance of Tagger |
| [options.filter] | [<code>Filter</code>](#Filter) | An instance of Filter |

**Example** *(Example usage of &#x27;contructor&#x27; (with paramters))*  
```js
let myTagger = new Tagger(), // According myTagger contain your custom settings
  myFilter = new Filter(), // According myFilter contain your custom settings
  termExtractor = new TermExtractor({ 'tagger': myTagger, 'filter': myFilter });
// returns an instance of TermExtractor with custom options
```
**Example** *(Example usage of &#x27;contructor&#x27; (with default values))*  
```js
let termExtractor = new TermExtractor();
// returns an instance of TermExtractor with default options
```
<a name="TermExtractor+extract"></a>

### termExtractor.extract(taggedTerms) ⇒ <code>Object</code>
Extract temrs

**Kind**: instance method of [<code>TermExtractor</code>](#TermExtractor)  
**Returns**: <code>Object</code> - Return all extracted terms  

| Param | Type | Description |
| --- | --- | --- |
| taggedTerms | <code>Array</code> | List of tagged terms |

**Example** *(Example usage of &#x27;extract&#x27; function)*  
```js
let termExtractor = new TermExtractor(),
  myDefaultTagger = new Tagger(),
  taggedTerms = myDefaultTagger.tag('This is a sample test for this module. It index any fulltext. It is a sample test.');
termExtractor.extract(taggedTerms);
// return
// { 'sample': { 'frequency': 2, 'strength': 1 }, 'test': { 'frequency': 2, 'strength': 1 },
// 'sample test': { 'frequency': 2, 'strength': 2 },
// 'module': { 'frequency': 1, 'strength': 1 },
// 'index': { 'frequency': 1, 'strength': 1 },
// 'fulltext': { 'frequency': 1, 'strength': 1 }
// };
```
<a name="TermExtractor+_startsWith"></a>

### termExtractor.\_startsWith(str, prefix) ⇒ <code>Boolean</code>
Check if prefix of given string match with given prefix

**Kind**: instance method of [<code>TermExtractor</code>](#TermExtractor)  
**Returns**: <code>Boolean</code> - Return true if the prefix of the string is correct, else false  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | String where the prefix will be searched |
| prefix | <code>String</code> | Prefix used for the research |

