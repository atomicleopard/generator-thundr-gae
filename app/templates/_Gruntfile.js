module.exports = function (grunt) {
	'use strict';
	
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.config.init({
	basic: {
		src: 'src/main/static',
		dist: 'src/main/webapp/static'
	},
    yeoman: {
    	project: '<%= _.slugify(project) %>',
    	port: 8080
    },
    extensions: {
    	// file extensions for different asset types
		images: 	'{png,jpg,jpeg,gif,webp,svg}',
		fonts: 		'{css,eot,svg,ttf,woff,gif,png,jpg,jpeg}',
	},
    srcs: {
    	// source location for different asset types
    	css: 		'<%%= basic.src %>/css/', 
    	fonts: 		'<%%= basic.src %>/fonts/', 
    	images:		'<%%= basic.src %>/images/', 
    	js: 		'<%%= basic.src %>/javascript/', 
    	less:		'<%%= basic.src %>/less/styles/', 
    	templates:	'<%%= basic.src %>/templates/',
    },
    
    clean: { // Clean generated assets - basically purges src/main/webapp/static
    	static:	{ src: '<%%= basic.dist %>', 	dot: true },
    	bower:	{ src: 'bower_components', 		dot: true }
    },
    copy: { // Copy assets from src/main/static to /src/main/webapp/static
    	css: 		{ cwd: '<%%= srcs.css %>', 		src: '{,*/}*.css',						dest: '<%%= basic.dist %>/css/', 		expand: true },
    	fonts: 		{ cwd: '<%%= srcs.fonts %>', 	src: '{,*/}*.<%%= extensions.fonts %>',	dest: '<%%= basic.dist %>/fonts/', 		expand: true },
    	images: 	{ cwd: '<%%= srcs.images %>',	src: '**/*.<%%= extensions.images %>',	dest: '<%%= basic.dist %>/images/',		expand: true },
    	templates:	{ cwd: '<%%= srcs.templates %>',	src: '**/*.html',						dest: '<%%= basic.dist %>/templates/',	expand: true }
    },
    less: { // Compiles Less files in src/main/static/less/styles into src/main/webapp/static
    	static: {
			options: { 	compress: true, cleancss: true },
			files: [{	cwd: '<%%= basic.src %>',	src: ['less/styles/**/*.less'],	dest: '<%%= basic.dist %>/styles/',	ext: '.css',	flatten: true, 	expand: true }]
		}
    },
    uglify: { // Generates output javascript from src/main/static/javascript
    	js: {	
    		options: {	beautify: true, sourceMap: true, sourceMapIncludeSources: true, mangle: false, compress: false },
    		files: [{	cwd: '<%%= basic.src %>',	src : [ 'javascript/**/*.js' ],	dest: '<%%= basic.dist %>/', expand: true }]	
    	}
    },
    bower: { // Install your bower dependencies to src/main/static/lib
        install: { options: { targetDir: '<%%= basic.dist %>/lib', layout: 'byComponent' } }
    },
    
    
    jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: [
          'Gruntfile.js',
          '<%%= basic.src %>/javascript/{,**/}*.js'
        ]
      },
      
	// unit test settings
	karma: {
		options: {
			basePath:			'', 						// base path, that will be used to resolve files and exclude
			frameworks:			['jasmine'],				// testing framework to use (jasmine/mocha/qunit/...)
			port: 				'<%%= yeoman.port + 2 %>',	// web server port
			logLevel: 			"LOG_INFO", 				// level of logging: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
			autoWatch: 			true, 						// enable / disable watching file and executing tests whenever any file changes
			browsers: 			['Chrome'],					// Start these browsers. Options: Chrome, ChromeCanary, Firefox, Opera, Safari (only Mac), PhantomJS, IE (only Windows)
			reporters: 			['progress', 'coverage'],
			coverageReporter: 	{ type : 'html', dir : 'target/js-coverage/' },

			// list of files / patterns to load in the browser to support testing
			files: [
			    '<%%= basic.dist %>/lib/jquery/jquery.js',
				// Add any other core dependencies here(e.g. bootstrap, angular, etc)
				'<%%= basic.dist %>/javascript/**/*.js',
				'src/test/static/**/*Test.js'
			],
			// list of files / patterns to exclude
			exclude: [],

			// define files interested in for coverage
			preprocessors: {
				'src/main/webapp/static/javascript/*.js': ['coverage'] // cannot do interpolation, so we hardcode the base path
			},
		},
		single: 	{  singleRun: true }, // use this in build
		continuous: {  singleRun: false } // use this for continuous mode and file watching when writing tests
	},
      
      
    /**
     * Watch for changes to the asset groups and re-process as necessary.
     */
    watch: {
    	css: 		{ tasks: ['copy:css'], 		files: ['<%%= basic.src %>/css/**/*.css'] },
    	fonts: 		{ tasks: ['copy:fonts'], 	files: ['<%%= basic.src %>/fonts/**/*.<%%= extensions.fonts %>'] },
    	images: 	{ tasks: ['copy:images'],	files: ['<%%= basic.src %>/images/**/*.<%%= extensions.images %>'] },
    	js: 		{ tasks: ['uglify'],		files: ['<%%= basic.src %>/javascript/**/*.js'] },
    	less: 		{ tasks: ['less'],			files: ['<%%= basic.src %>/less/**/*.less', ] },
    	templates: 	{ tasks: ['copy:templates'],files: ['<%%= basic.src %>/templates/**/*.html'] },
    	bower: 		{ tasks: ['bower'],			files: ['bower.json'] }
    },
      
	connect : {
		 options : { port : '<%%= yeoman.port %>', hostname : 'localhost' },
         proxies : [ {
             context : [ '/', '!/static' ],
             host : 'localhost',
             port : '<%%= yeoman.port + 1 %>'
         }],
         server: {
             options: {
               host : 'localhost',
               port : '<%%= yeoman.port %>',
               base: 'src/main/webapp',
               logger: 'dev',
               middleware: function (connect, options) {
                  var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                  return [
                     proxy, // Include the proxy first
                     connect.static(options.base), // Serve static files.
                     connect.directory(options.base) // Make empty directories browsable.
                  ];
               }
             },
             proxies : [ {
				context : [ '/', '!/static' ],
				host : 'localhost',
				port : '<%%= yeoman.port + 1%>'
             	}]
         	}
      	}
  	});

  	grunt.registerTask('default', [
         'build',
         'test',
         'watch'
    ]);
  	
	grunt.registerTask('build', [
		'clean:static',
		'copy',
		'less',
		'uglify',
		'bower',
    ]);

	grunt.registerTask('test', [
	    'build',
		'karma:single'
	]);
	
	grunt.registerTask('eclipse', [
		'default'
	]);
	
	grunt.registerTask('intellij', [
            'build',
            'configureProxies',  
            'connect:server',
            'watch'
	]);
};
