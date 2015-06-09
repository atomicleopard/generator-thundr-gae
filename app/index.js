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

    
    var prompts = [];
    if(!this.config.get('project')){
    	prompts.push({
    		name: 'project',
    		message: 'What is the name of this project?'
    	});
    }

    this.prompt(prompts, function (props) {
      this.project = props.project || this.config.get('project');
      this.config.set('project', this.project);
      this.config.save();
      done();
    }.bind(this));
  },

  app: function () {
    this.copy('gitignore', '.gitignore');
    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.template('_pom.xml', 'pom.xml');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.directory('src', 'src');
    this.directory('etc', 'etc');
    this.mkdir('src/test/java/');
    this.mkdir('src/test/java/');
    this.mkdir('src/main/static/');
    this.mkdir('src/main/static/css');
    this.mkdir('src/main/static/fonts');
    this.mkdir('src/main/static/images');
    this.mkdir('src/main/static/templates');
    
    this.template('_appengine-web.xml', 'src/main/webapp/WEB-INF/appengine-web.xml');
  }
});

module.exports = ThundrGaeGenerator;