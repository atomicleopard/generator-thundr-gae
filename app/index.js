'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var ThundrGaeGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic ThundrGae generator.'));

    var prompts = [{
      name: 'project',
      message: 'What is the name of this project?'
    }];

    this.prompt(prompts, function (props) {
      this.project = props.project;

      done();
    }.bind(this));
  },

  app: function () {
    this.copy('gitignore', '.gitignore');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.template('_pom.xml', 'pom.xml');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.directory('src', 'src');
    this.mkdir('src/main/static/');
    this.mkdir('src/main/static/images');
    this.mkdir('src/main/static/font');
    this.mkdir('src/main/static/javascript');
    this.mkdir('src/main/static/less');
    this.mkdir('src/main/static/less/mixins');
    this.mkdir('src/main/static/less/styles');
    this.mkdir('src/main/static/partials');
    this.mkdir('src/main/static/styles');
    this.template('_appengine-web.xml', 'src/main/webapp/WEB-INF/appengine-web.xml');
  }
});

module.exports = ThundrGaeGenerator;