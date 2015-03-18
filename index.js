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

var path = require('path');
var glob = require('globby');
var async = require('async');
var isGlob = require('is-glob');
var relative = require('relative');
var comments = require('js-comments');
var extend = require('extend-shallow');
var extract = require('extract-gfm');

/**
 * Expose `apidocs` helper
 */

module.exports = apidocs;

/**
 * Generate API docs from code comments in the JavaScript
 * files that match the given `patterns`. Only code comments
 * with `@api public` are rendered.
 *
 * @param  {String} `patterns`
 * @param  {Object} `options`
 * @return {String}
 * @api public
 */

function apidocs(app) {
  app.create('apidoc', {isRenderable: true, isPartial: true });
  app.option('renameKey', false);

  var appDelims = app.delims['.*'].original;

  return function (patterns, options, cb) {
    if (typeof patterns === 'object' && !Array.isArray(patterns)) {
      cb = options; options = patterns; patterns = null;
    }

    if (typeof options === 'function') {
      cb = options; options = {};
    }

    var opts = extend({sep: '\n', dest: 'README.md'}, options);
    opts.cwd = path.resolve(opts.cwd || app.option('cwd') || process.cwd());
    var delims = opts.escapeDelims || appDelims || ['<%=', '%>'];
    var dest = opts.dest;

    if (dest && dest.indexOf('://') === -1) {
      dest = relative(dest);
    }

    if (!patterns) {
      patterns = path.join(opts.cwd, '*.js');
    }

    if (!isGlob(patterns)) {
      var fp = path.join(opts.cwd, patterns);
      return renderFile(app, delims, fp, dest, opts, cb);
    }

    glob(patterns, opts, function(err, files) {
      async.mapSeries(files, function(fp, next) {
        renderFile(app, delims, fp, dest, opts, next);
      }, function (err, arr) {
        if (err) return cb(err);
        cb(null, arr.join('\n'));
      });
    });
  };
}


function renderFile(app, delims, fp, dest, opts, next) {
  var res = headings(comments(fp, dest, opts));
  var delim = delims[0];

  // protect escaped template variables
  res = res.split(delim + '%').join('__DELIM__');

  app.apidoc({ path: fp, content: res, ext: '.md', engine: '.md' });
  var file = app.views.apidocs[fp];

  app.render(file, opts, function (err, content) {
    if (err) return next(err);

    // replace escaped template variables
    next(null, content.split('__DELIM__').join(delim));
  });
}

function headings(str, lvl) {
  var o = extract.parseBlocks(str);
  lvl = lvl ? '######'.substr(lvl + 2) : '##';
  o.text = o.text.replace(/^#/gm, lvl);
  return extract.injectBlocks(o.text, o.blocks);
}
