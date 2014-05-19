/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('thundr-gae generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('thundr-gae:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      'package.json',
      'bower.json',
      'Gruntfile.js',
      'pom.xml',
      '.gitignore',
      'src/main/java/ApplicationModule.java',
      'src/main/java/ApplicationRoutes.java',
      'src/main/resources/application.properties',
      'src/main/webapp/WEB-INF/appengine-web.xml',
      'src/main/webapp/WEB-INF/web.xml',
      'src/main/webapp/WEB-INF/logging.properties'
    ];

    helpers.mockPrompt(this.app, {
      'someOption': true
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
