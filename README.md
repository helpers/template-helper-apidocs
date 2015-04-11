# template-helper-apidocs [![NPM version](https://badge.fury.io/js/template-helper-apidocs.svg)](http://badge.fury.io/js/template-helper-apidocs)  [![Build Status](https://travis-ci.org/jonschlinkert/template-helper-apidocs.svg)](https://travis-ci.org/jonschlinkert/template-helper-apidocs) 

> Template helper for automatically generating API docs from code comments. This is based on helper-apidocs, but specifically for applications built-with the Template library.

**Heads up!** This is an async helper that is only compatible with applications built with [Template][template], such as [verb], [assemble], or of course Template directly.

## Install with [npm](npmjs.org)

```bash
npm i template-helper-apidocs --save
```

## Example usage

With Lo-Dash or Underscore:

```js
<%= apidocs("index.js") %>
```

With Handlebars:

```handlebars
{{apidocs "index.js"}}
```

With Verb (lo-dash, with special delimiters to avoid delimiter collision in markdown docs):

```js
{%= apidocs("index.js") %}
```


## Running tests
Install dev dependencies:

```bash
npm i -d && npm test
```

See [the tests](./test.js) for actual usage examples.


## Register the helper

> This should work with any engine, here are a few examples

### [template]

Register the helper for use with any template engine

```js
template.helper('apidocs', require('template-helper-apidocs'));
```

### [assemble]

To register the helper for use with [assemble] v0.6.x:

```js
assemble.helper('apidocs', require('template-helper-apidocs'));
```

### [verb]

Register the helper for use with [verb]:

```js
var verb = require('verb');
verb.helper('apidocs', require('template-helper-apidocs'));

verb.task('default', function() {
  verb.src('.verb*.md')
    .pipe(verb.dest('./'));
});
```

### [handlebars]

```js
var handlebars = require('handlebars');
handlebars.registerHelper('apidocs', require('template-helper-apidocs'));
```

### [Lo-Dash] or [underscore]

```js
// as a mixin
_.mixin({apidocs: apidocsHelper});
_.template('<%= _.apidocs("fixtures/*.js") %>', {});

// passed on the context
_.template('<%= apidocs("fixtures/*.js") %>', {apidocs: apidocsHelper});

// as an import
var settings = {imports: {apidocs: apidocsHelper}};
_.template('<%= apidocs("fixtures/*.js") %>', {}, settings);
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/template-helper-apidocs/issues). To request or contribute a helper to the [github.com/helpers][helpers] org, please read [this contributing guide][guide] to get started.

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014-2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on April 11, 2015._

[assemble]: https://github.com/assemble/assemble
[generator-verb]: https://github.com/assemble/generator-verb
[handlebars-helpers]: https://github.com/assemble/handlebars-helpers/
[handlebars]: https://github.com/wycats/handlebars.js/
[helpers]: https://github.com/helpers
[Lo-Dash]: https://lodash.com/
[template]: https://github.com/jonschlinkert/template
[underscore]: https://github.com/jashkenas/underscore
[verb]: https://github.com/assemble/verb
[guide]: https://github.com/helpers/requests

