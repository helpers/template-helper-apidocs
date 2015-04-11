/*!
 * template-helper-apidocs <https://github.com/jonschlinkert/template-helper-apidocs>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps:mocha */
require('should');
var path = require('path');
var handlebars = require('handlebars');
var relative = require('relative');
var Template = require('template');
var _ = require('lodash');
var apidocs = require('./');
var template;


function resolve(fp) {
  var pkg = path.resolve('node_modules', fp, 'package.json');
  try {
    var obj = require(pkg);
    var main = obj && obj.main;
    return relative(path.resolve(path.dirname(pkg), main));
  } catch(err) {
    console.log(err);
  }
  return null;
}

describe('apidocs', function () {
  it('should generate API docs from the given file:', function () {
    apidocs("fixtures/a.js").should.match(/### \[\.aaa\]/);
  });

  it('should generate API docs from a glob of files:', function () {
    apidocs("fixtures/*.js").should.match(/### \[\.aaa\]/);
    apidocs("fixtures/*.js").should.match(/### \[\.ddd\]/);
  });
});


describe('helper apidocs', function () {
  beforeEach(function () {
    template = new Template();
    template.engine('*', require('engine-lodash'));
    template.option('escapeDelims', ['<%%=']);
    template.helper('apidocs', apidocs);
    template.helper('resolve', resolve);
  });

  it('should work with Template:', function (cb) {
    template.page('docs', {content: '<%= apidocs("fixtures/b.js") %>'});
    var tmpl = template.getPage('docs');

    template.render(tmpl, function (err, content) {
      if (err) return cb(err);
      content.should.match(/### \[\.bbb\]/);
      cb();
    });
  });

  it('should resolve nested templates:', function (cb) {
    template.page('docs', {content: '<%= apidocs("fixtures/a.js") %>'});
    var tmpl = template.getPage('docs');

    template.render(tmpl, function (err, content) {
      if (err) return cb(err);
      content.should.match(/node_modules/);
      cb();
    });
  });

  it('should replace escaped templates with non-characters:', function (cb) {
    template.page('docs', {content: '<%= apidocs("fixtures/a.js") %>'});
    var tmpl = template.getPage('docs');

    template.render(tmpl, function (err, content) {
      if (err) return cb(err);
      content.should.match(/<%= whatever %>/);
      cb();
    });
  });

  it('should render the first comment when `skipFirst` is not true:', function (cb) {
    template.page('foo', {content: '<%= apidocs("fixtures/ctor.js") %>'});

    var foo = template.getPage('foo');
    template.render(foo, function (err, content) {
      if (err) return cb(err);
      content.should.match(/new Options/);
      cb();
    });
  });

  it('should not render the first comment when `skipFirst` is true:', function (cb) {
    template.page('foo', {content: '<%= apidocs("fixtures/ctor.js", {skipFirst: true}) %>'});

    var foo = template.getPage('foo');
    template.render(foo, function (err, content) {
      if (err) return cb(err);
      content.should.not.match(/new Options/);
      cb();
    });
  });
});
