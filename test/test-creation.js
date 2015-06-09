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
      'src/main/java/controllers/Routes.java',
      'src/main/java/controllers/Controller.java',
      'src/main/resources/application.properties',
      'src/main/webapp/WEB-INF/appengine-web.xml',
      'src/main/webapp/WEB-INF/web.xml',
      'src/main/webapp/WEB-INF/logging.properties',
      'src/main/webapp/WEB-INF/tags/layout.tag',
      'src/main/webapp/WEB-INF/jsp/home.jsp',
      'src/main/static/images/favicon/original.png',
      'src/main/static/javascript/app.js',
      'src/main/static/less/styles/main.less',
      'src/main/static/less/styles/home.less',
      'src/main/static/less/mixins/mixins.less',
      'src/main/static/less/mixins/variables.less',
      'src/main/static/templates/home.html'
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
