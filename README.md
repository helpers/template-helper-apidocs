# template-helper-apidocs [![NPM version](https://badge.fury.io/js/template-helper-apidocs.svg)](http://badge.fury.io/js/template-helper-apidocs)  [![Build Status](https://travis-ci.org/helpers/template-helper-apidocs.svg)](https://travis-ci.org/helpers/template-helper-apidocs)

> Template helper for automatically generating API docs from code comments. This is based on helper-apidocs, but specifically for applications built-with the Template library.

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i template-helper-apidocs --save
```

## Table of contents

<!-- toc -->

* [Docs](#docs)
  - [Registering the helper](#registering-the-helper)
    + [template](#template)
    + [assemble](#assemble)
    + [verb](#verb)
    + [handlebars](#handlebars)
    + [Lo-Dash and underscore](#lo-dash-and-underscore)
* [Example usage](#example-usage)
* [Other awesome libs](#other-awesome-libs)
* [Contributing](#contributing)
* [Running tests](#running-tests)
* [Author](#author)
* [License](#license)

_(Table of contents generated by [verb](https://github.com/assemble/verb))_

<!-- tocstop -->

## Docs

### [apidocs](index.js#L35)

Generate API docs from code comments for any JavaScript files that match the given `patterns`. Note that **only code comments with `@api public` will be rendered.**

**Params**

* `patterns` **{String}**: Glob patterns for files with code comments to render.
* `options` **{Object}**: Options to pass to [js-comments](https://github.com/jonschlinkert/js-comments).
* `returns` **{String}**: Markdown-formatted API documentation

**Example**

```js
apidocs("index.js");
```

_(this section was generated using this helper)_

### Registering the helper

> This helper should work with any template engine, here are a few examples

#### template

Register the helper with [Template](https://github.com/jonschlinkert/template), allowing it to be used with any template engine.

```js
template.helper('apidocs', require('template-helper-apidocs'));
```

#### assemble

Register the helper with [assemble](http://assemble.io)v0.6.x:

```js
var assemble = require('assemble');
assemble.helper('apidocs', require('template-helper-apidocs'));
```

#### verb

Register the helper with [verb](https://github.com/assemble/verb):

```js
var verb = require('verb');
verb.helper('apidocs', require('template-helper-apidocs'));
```

#### handlebars

Usage with [handlebars](http://www.handlebarsjs.com/)

```js
var handlebars = require('handlebars');
handlebars.registerHelper('apidocs', require('template-helper-apidocs'));
```

#### Lo-Dash and underscore

To use the helpers with [Lo-Dash](https://lodash.com/) or [underscore](http://underscorejs.org):

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

***

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

***

## Other awesome libs

* [assemble](http://assemble.io): Static site generator for Grunt.js, Yeoman and Node.js. Used by Zurb Foundation, Zurb Ink, H5BP/Effeckt,… [more](http://assemble.io)
* [handlebars-helpers](https://github.com/assemble/handlebars-helpers): 120+ Handlebars helpers in ~20 categories, for Assemble, YUI, Ghost or any Handlebars project. Includes… [more](https://github.com/assemble/handlebars-helpers)
* [js-comments](https://github.com/jonschlinkert/js-comments): Parse JavaScript code comments and generate API documentation.
* [parse-comments](https://github.com/jonschlinkert/parse-comments): Parse code comments from JavaScript or any language that uses the same format.
* [template](https://github.com/jonschlinkert/template): Render templates using any engine. Supports, layouts, pages, partials and custom template types. Use template… [more](https://github.com/jonschlinkert/template)
* [template-helpers](https://github.com/jonschlinkert/template-helpers): Generic JavaScript helpers that can be used with any template engine. Handlebars, Lo-Dash, Underscore, or… [more](https://github.com/jonschlinkert/template-helpers)
* [verb](https://github.com/assemble/verb): Documentation generator for GitHub projects. Extremely powerful, easy to use, can generate anything from API… [more](https://github.com/assemble/verb)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/helpers/template-helper-apidocs/issues/new)

To request or contribute a helper to the [github.com/helpers](https://github.com/helpers) org, please read [this contributing guide](https://github.com/helpers/requests) to get started.

## Running tests

Install dev dependencies:

```sh
$ npm i -d && npm test
```

See [the tests](./test.js) for actual usage examples.

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License

Copyright © 2014-2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on May 29, 2015._
