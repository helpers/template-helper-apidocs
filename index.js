/*!
 * template-helper-apidocs <https://github.com/jonschlinkert/template-helper-apidocs>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/**
 * Module dependencies
 */

var fs = require('fs');
var glob = require('globby');
var comments = require('js-comments');
var isGlob = require('is-glob');

/**
 * Generate API docs from code comments for any JavaScript
 * files that match the given `patterns`.
 *
 * **Only code comments with `@api public` will be rendered.**
 *
 * @param  {String} `patterns`
 * @param  {Object} `options`
 * @return {String}
 * @api public
 */

module.exports = function apidocs(patterns, opts) {
  opts = opts || {};
  opts.file = opts.file || {};

  var delims = opts.escapeDelims || ['<%%', '<%'];
  var files = isGlob ? glob.sync(patterns, opts) : [patterns];
  var dest = opts && opts.dest || 'README.md';
  var len = files.length, i = 0;
  var res = '';

  while (len--) {
    var fp = files[i++];
    var str = fs.readFileSync(fp, 'utf8');
    var arr = comments.parse(str);
    opts.file.path = fp;
    res += comments.render(arr, opts);
  }

  res = comments.format(res);
  if (this && this.app) {
    res = res.split(delims[0]).join('__DELIM__');
    res = this.app.render(res, opts);
    res = res.split('__DELIM__').join(delims[1]);
  }
  return res;
};
