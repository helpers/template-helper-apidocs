/*!
 * helper-apidocs <https://github.com/ * Module dependencies/helper-apidocs>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Create a new instance of `Options`.
 *
 * ```js
 * var app = new Options();
 * ```
 *
 * @param {Object} `options` Initialize with default options.
 * @api public
 */

var Options = module.exports = function Options(options) {
  this.options = options || {};
};

/**
 * Set or get an option.
 *
 * ```js
 * app.option('a', true);
 * app.option('a');
 * //=> true
 * ```
 *
 * @param {String} `key` The option name.
 * @param {*} `value` The value to set.
 * @return {*} Returns a `value` when only `key` is defined.
 * @api public
 */

Options.prototype.option = function(key, val) {
  if (arguments.length === 1 && typeOf(key) === 'string') {
    if (key.indexOf('.') === -1) {
      return this.options[key];
    }
    return get(this.options, key);
  }

  if (typeOf(key) === 'object') {
    merge.apply(merge, [this.options].concat([].slice.call(arguments)));
  } else if (typeOf(val) === 'object') {
    set(this.options, key, merge(this.option(key) || {}, val));
  } else {
    set(this.options, key, val);
  }
  return this;
};

/**
 * Enable `key`.
 *
 * **Example**
 *
 * ```js
 * app.enable('a');
 * ```
 *
 * @param {String} `key`
 * @return {Object} `Options`to enable chaining
 * @api public
 */

Options.prototype.enable = function(key) {
  return this.option(key, true);
};
