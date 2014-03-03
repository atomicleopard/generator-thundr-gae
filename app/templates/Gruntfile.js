'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: {
    	// configurable paths
    	app: require('./bower.json').appPath || 'app',
		src: 'src/main/static',
  		dist: 'src/main/webapp/static',
    },
    extensions: {
    	// file extensions for different asset types
		images: '{png,jpg,jpeg,gif,webp,svg}',
		font: '{css,eot,svg,ttf,woff,gif,png,jpg,jpeg}',
	},
    srcs: {
    	// source location for different asset types
    	js: '<%= yeoman.src %>/javascript/', 
    	font: '<%= yeoman.src %>/font/', 
    	less: '<%= yeoman.src %>/less/styles/', 
    	images: '<%= yeoman.src %>/images/', 
    	partials: '<%= yeoman.src %>/partials/',
    },
    
    
    clean: { // Clean generated assets - basically purges src/main/webapp/static
    	static: { src: '<%= yeoman.dist %>', 	dot: true },
    	bower: { src: 'bower_components', 		dot: true }
    },
    copy: { // Copy assets from src/main/static to /src/main/webapp/static
    	font: 		{ cwd: '<%= srcs.font %>', 		src: '{,*/}*.<%= extensions.font %>',	dest: '<%= yeoman.dist %>/font/', 		expand: true },
    	images: 	{ cwd: '<%= srcs.images %>',	src: '**/*.<%= extensions.images %>',	dest: '<%= yeoman.dist %>/images/',		expand: true },
    	partials:	{ cwd: '<%= srcs.partials %>',	src: '**/*.html',						dest: '<%= yeoman.dist %>/partials/',	expand: true }
    },
    less: { // Compiles Less files in src/main/static/less/styles into src/main/webapp/static
    	static: {
			options: { 	compress: true, cleancss: true },
			files: [{	cwd: '<%= yeoman.src %>',	src: ['less/styles/**/*.less'],	dest: '<%= yeoman.dist %>/styles/',	ext: '.css',	flatten: true, 	expand: true }]
		}
    },
    uglify: { // Generates output javascript from src/main/static/javascript
    	js: {	
    		options: {	beautify: true, sourceMap: true, sourceMapIncludeSources: true, mangle: false, compress: false },
    		files: [{	cwd: '<%= yeoman.src %>',	src : [ 'javascript/**/*.js' ],	dest: '<%= yeoman.dist %>/', expand: true }]	
    	}
    },
    bower: { // Install your bower dependencies to src/main/static/lib
        install: { options: { targetDir: '<%= yeoman.dist %>/lib', layout: 'byComponent' } }
    },
    
    
    jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: [
          'Gruntfile.js',
          'src/main/webapp/javascript/{,*/}*.js'
        ]
      },
    karma: {
      unit: {
        configFile: 'src/test/javascript/karma.conf.js',
        singleRun: true
      }
    },
    /**
     * Watch for changes to the asset groups and re-process as necessary.
     */
    watch: {
    	js: 		{ tasks: ['uglify'],		files: ['<%= yeoman.src %>/javascript/**/*.js'] },
    	font: 		{ tasks: ['copy:font'], 	files: ['<%= yeoman.src %>/font/**/*.<%= extensions.images %>'] },
    	less: 		{ tasks: ['less'],			files: ['<%= yeoman.src %>/less/**/*.less', ] },
    	images: 	{ tasks: ['copy:images'],	files: ['<%= yeoman.src %>/images/**/*.<%= extensions.images %>'] },
    	partials: 	{ tasks: ['copy:partials'],	files: ['<%= yeoman.src %>/partials/**/*.html'] },
    	bower: 		{ tasks: ['bower'],			files: ['bower.json'] }
    }
  });
  

	grunt.registerTask('build', [
		'clean:static',
		'copy',
		'less',
		'uglify',
		'bower'
    ]);

	grunt.registerTask('default', [
		'build',
		'watch'
	]);
};
