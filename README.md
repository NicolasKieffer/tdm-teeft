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

## Classes

<dl>
<dt><a href="#DefaultFilter">DefaultFilter</a></dt>
<dd></dd>
<dt><a href="#Indexator">Indexator</a></dt>
<dd></dd>
<dt><a href="#Tagger">Tagger</a></dt>
<dd></dd>
<dt><a href="#TermExtractor">TermExtractor</a></dt>
<dd></dd>
</dl>

<a name="DefaultFilter"></a>

## DefaultFilter
**Kind**: global class  

* [DefaultFilter](#DefaultFilter)
    * [new DefaultFilter([options])](#new_DefaultFilter_new)
    * [.call(occur, strength)](#DefaultFilter+call) ⇒ <code>Boolean</code>
    * [.configure(length)](#DefaultFilter+configure) ⇒ <code>Number</code>

<a name="new_DefaultFilter_new"></a>

### new DefaultFilter([options])
**Returns**: [<code>DefaultFilter</code>](#DefaultFilter) - - An instance of DefaultFilter  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Options of constructor |
| [options.minOccur] | <code>Number</code> | Number of minimal occurence |
| [options.noLimitStrength] | <code>Number</code> | Strength limit |
| [options.lengthSteps] | <code>Number</code> | Steps length |

<a name="DefaultFilter+call"></a>

### defaultFilter.call(occur, strength) ⇒ <code>Boolean</code>
Check values depending of filter conditions

**Kind**: instance method of [<code>DefaultFilter</code>](#DefaultFilter)  
**Returns**: <code>Boolean</code> - Return true if conditions are respected  

| Param | Type | Description |
| --- | --- | --- |
| occur | <code>Number</code> | Occurence value |
| strength | <code>Number</code> | Strength value |

<a name="DefaultFilter+configure"></a>

### defaultFilter.configure(length) ⇒ <code>Number</code>
Configure the filter depending of lengthSteps

**Kind**: instance method of [<code>DefaultFilter</code>](#DefaultFilter)  
**Returns**: <code>Number</code> - Return configured minOccur value  

| Param | Type | Description |
| --- | --- | --- |
| length | <code>Number</code> | Text length |

<a name="Indexator"></a>

## Indexator
**Kind**: global class  

* [Indexator](#Indexator)
    * [new Indexator([options])](#new_Indexator_new)
    * [.tokenize(text)](#Indexator+tokenize) ⇒ <code>Array</code>
    * [.translateTag(tag)](#Indexator+translateTag) ⇒ <code>String</code>
    * [.sanitize(terms)](#Indexator+sanitize) ⇒ <code>Array</code>
    * [.lemmatize(terms)](#Indexator+lemmatize) ⇒ <code>Array</code>
    * [.compare(a, b)](#Indexator+compare) ⇒ <code>Number</code>
    * [.index(data)](#Indexator+index) ⇒ <code>Object</code>

<a name="new_Indexator_new"></a>

### new Indexator([options])
**Returns**: [<code>Indexator</code>](#Indexator) - - An instance of Indexator  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | Options of constructor |
| [options.filter] | <code>Object</code> | Options given to extractor of this instance of Indexator |
| [options.lexicon] | <code>Object</code> | Lexicon used by tagger of this instance of Indexator |
| [options.stopwords] | <code>Object</code> | Stopwords used by this instance of Indexator |
| [options.dictionary] | <code>Object</code> | Dictionnary used by this instance of Indexator |

<a name="Indexator+tokenize"></a>

### indexator.tokenize(text) ⇒ <code>Array</code>
Extract token from a text

**Kind**: instance method of [<code>Indexator</code>](#Indexator)  
**Returns**: <code>Array</code> - Array of tokens  

| Param | Type | Description |
| --- | --- | --- |
| text | <code>String</code> | Fulltext |

<a name="Indexator+translateTag"></a>

### indexator.translateTag(tag) ⇒ <code>String</code>
Translate the tag of Tagger to Lemmatizer

**Kind**: instance method of [<code>Indexator</code>](#Indexator)  
**Returns**: <code>String</code> - Tag who match with a Lemmatizer tag (or false)  

| Param | Type | Description |
| --- | --- | --- |
| tag | <code>String</code> | Tag given by Tagger |

<a name="Indexator+sanitize"></a>

### indexator.sanitize(terms) ⇒ <code>Array</code>
Sanitize list of terms (with some filter)

**Kind**: instance method of [<code>Indexator</code>](#Indexator)  
**Returns**: <code>Array</code> - Liste of sanitized terms  

| Param | Type | Description |
| --- | --- | --- |
| terms | <code>Array</code> | List of terms |

<a name="Indexator+lemmatize"></a>

### indexator.lemmatize(terms) ⇒ <code>Array</code>
Lemmatize a list of tagged terms (add a property lemma & stem)

**Kind**: instance method of [<code>Indexator</code>](#Indexator)  
**Returns**: <code>Array</code> - List of tagged terms with a lemma  

| Param | Type | Description |
| --- | --- | --- |
| terms | <code>Array</code> | List of tagged terms |

<a name="Indexator+compare"></a>

### indexator.compare(a, b) ⇒ <code>Number</code>
Compare the specificity of two objects between them

**Kind**: instance method of [<code>Indexator</code>](#Indexator)  
**Returns**: <code>Number</code> - -1, 1, or 0  

| Param | Type | Description |
| --- | --- | --- |
| a | <code>Object</code> | First object |
| b | <code>Object</code> | Second object |

<a name="Indexator+index"></a>

### indexator.index(data) ⇒ <code>Object</code>
Index a fulltext

**Kind**: instance method of [<code>Indexator</code>](#Indexator)  
**Returns**: <code>Object</code> - Return a representation of the fulltext (indexation & more informations/statistics about tokens/terms)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>String</code> | Fulltext who need to be indexed |

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

<a name="Tagger+tag"></a>

### tagger.tag(terms) ⇒ <code>Array</code>
Tag terms

**Kind**: instance method of [<code>Tagger</code>](#Tagger)  
**Returns**: <code>Array</code> - List of tagged terms  

| Param | Type | Description |
| --- | --- | --- |
| terms | <code>Array</code> | List of terms |

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
| [options.filter] | [<code>DefaultFilter</code>](#DefaultFilter) | An instance of DefaultFilter |

<a name="TermExtractor+extract"></a>

### termExtractor.extract(taggedTerms) ⇒ <code>Object</code>
Extract temrs

**Kind**: instance method of [<code>TermExtractor</code>](#TermExtractor)  
**Returns**: <code>Object</code> - Return all extracted terms  

| Param | Type | Description |
| --- | --- | --- |
| taggedTerms | <code>Array</code> | List of tagged terms |

<a name="TermExtractor+_startsWith"></a>

### termExtractor.\_startsWith(str, prefix) ⇒ <code>Boolean</code>
Check if prefix of given string match with given prefix

**Kind**: instance method of [<code>TermExtractor</code>](#TermExtractor)  
**Returns**: <code>Boolean</code> - Return true if the prefix of the string is correct, else false  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>String</code> | String where the prefix will be searched |
| prefix | <code>String</code> | Prefix used for the research |

