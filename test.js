/*!
 * template-helper-apidocs <https://github.com/jonschlinkert/template-helper-apidocs>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var path = require('path');
var handlebars = require('handlebars');
var Template = require('template');
var _ = require('lodash');
var apidocs = require('./');
var template, helper;

function resolve(fp, next) {
  next(null, resolveSync(fp));
}

function resolveSync(fp, next) {
  var pkg = path.resolve('node_modules', fp, 'package.json');
  var obj = require(pkg);
  var main = obj && obj.main;
  return path.resolve(path.dirname(pkg), main);
}

describe('helper apidocs', function () {
  beforeEach(function (cb) {
    template = new Template();
    template.option('escapeDelims', ['<%%=']);
    helper = apidocs(template);
    template.asyncHelper('apidocs', helper);
    template.asyncHelper('resolve', resolve);
    cb();
  });

  it('should work with Template:', function (done) {
    template.page('docs', {content: '<%= apidocs("fixtures/a.js") %>'});
    var tmpl = template.getPage('docs');

    template.render(tmpl, function (err, content) {
      if (err) return done(err);
      content.should.match(/### \[\.aaa\]/);
      done();
    });
  });

  it('should resolve nested templates:', function (done) {
    template.page('docs', {content: '<%= apidocs("fixtures/a.js") %>'});
    var tmpl = template.getPage('docs');

    template.render(tmpl, function (err, content) {
      if (err) return done(err);
      content.should.match(/node_modules/i);
      done();
    });
  });

  it('should replace escaped templates with non-characters:', function (done) {
    template.page('docs', {content: '<%= apidocs("fixtures/a.js") %>'});
    var tmpl = template.getPage('docs');

    template.render(tmpl, function (err, content) {
      if (err) return done(err);
      content.should.match(/<%=\s*whatever\s*%>/gi);
      done();
    });
  });

  it('should generate API docs from the given file:', function (done) {
    helper("fixtures/a.js", function (err, content) {
      content.should.match(/### \[\.aaa\]/);
      done()
    });
  });

  it('should generate API docs from a glob of files:', function (done) {
    helper("fixtures/*.js", function (err, content) {
      content.should.match(/### \[\.aaa\]/);
      content.should.match(/### \[\.ddd\]/);
      done();
    });
  });
});
