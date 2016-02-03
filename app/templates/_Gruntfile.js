module.exports = function (grunt) {
  'use strict';
	
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  
  var debugJs = false;

  grunt.config.init({
	basic: {
		src: 'src/main/static',
		gen: 'target/generated-sources',
		dist: 'src/main/webapp/static'
	},
    yeoman: {
    	project: '<%= _.slugify(project) %>',
    	port: 8080
    },
    extensions: {
    	// file extensions for different asset types
		images: 	'{png,jpg,jpeg,gif,webp,svg}',
		fonts: 		'{css,eot,svg,ttf,woff,woff2,gif,png,jpg,jpeg}',
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
    	static:		{ src: '<%%= basic.dist %>',dot: true },
    	bower:		{ src: 'bower_components',	dot: true },
    	generated:	{ src: '<%%= basic.gen %>',	dot: true }
    },
    copy: { // Copy assets from src/main/static to /src/main/webapp/static
    	css: 		{ cwd: '<%%= srcs.css %>', 		src: '{,*/}*.css',						dest: '<%%= basic.dist %>/css/', 		expand: true },
    	fonts: 		{ cwd: '<%%= srcs.fonts %>', 	src: '{,*/}*.<%%= extensions.fonts %>',	dest: '<%%= basic.dist %>/fonts/', 		expand: true },
    	images: 	{ cwd: '<%%= srcs.images %>',	src: '**/*.<%%= extensions.images %>',	dest: '<%%= basic.dist %>/images/',		expand: true },
    	templates:	{ cwd: '<%%= srcs.templates %>',src: '**/*.html',						dest: '<%%= basic.dist %>/templates/',	expand: true },
    	bower:		{ cwd: '<%%= basic.gen %>/lib',		src: ['**/*.<%%= extensions.fonts %>'],	dest: '<%%= basic.dist %>/lib', 				expand: true }
    },
    "goog-webfont-dl": { // loads fonts from google fonts
    	lato: {
    	      options: {
    	          ttf: true, eot: true, woff: true, woff2: true, svg: true,
    	          fontname: 'Lato',
    	          fontstyles: '400',
    	          fontdest: '<%%= basic.dist %>/fonts/',
    	          cssdest: '<%%= basic.dist %>/fonts/fonts.css'
    	      }
    	  }
	},
    less: { // Compiles Less files in src/main/static/less/styles into src/main/webapp/static
    	generate: {
			options: { 	compress: true, cleancss: true },
			files: [{	cwd: '<%%= basic.src %>',	src: ['less/styles/**/*.less'],	dest: '<%%= basic.dist %>/styles/',	ext: '.css',	flatten: true, 	expand: true }]
		}
    },
	postcss: {
        options: {
			map: {
        		inline: false,
        		annotation: '<%%= basic.dist %>/styles/' 
			},
			processors: [
				require('autoprefixer')({browsers: '> 0.5%, last 2 versions'}), // add vendor prefixes
				require('cssnano')() // minify the result
			]
        },
        css: {
        	cwd: '<%%= basic.gen %>',	
    		src : [ 'styles/**/*.css' ],	
    		dest: '<%%= basic.dist %>/', 
    		expand: true
        }
    },
    favicons: { // Generate favicons from one single original favicon file.
    	// REQUIRES IMAGE MAGIC - installation instructions here: https://github.com/gleero/grunt-favicons 
        options: {
        	html: 'src/main/webapp/WEB-INF/tags/meta-favicons.html',
  	  		HTMLPrefix: "/static/images/favicon/"
        },
        generate: {
        	 src: '<%%= srcs.images %>/favicon/original.png',
             dest: '<%%= basic.dist %>/images/favicon'
        },
    },
    jshint: {
        js: [
          'Gruntfile.js',
          '<%%= basic.src %>/javascript/{,**/}*.js'
        ],
        options: {
            //jshintrc: '.jshintrc'
        }
    },
    ngAnnotate: { // Automatically add angular annotation for angular DI - Generates files into target/generated-sources/javascript
        js: {
        	files: [{	
        		cwd: '<%%= basic.src %>',	
        		src : [ 'javascript/**/*.js' ],	
        		dest: '<%%= basic.gen %>/', 
        		expand: true 
        	}]
        }
    },    
    concat: { // Concatenates application javascript into one uber file
        js: {
          src: ['<%%= basic.gen %>/javascript/app.js', '<%%= basic.gen %>/javascript/**/*.js', "!<%%= basic.gen %>/javascript/application.js"],
          dest: '<%%= basic.gen %>/javascript/application.js'
        },
    },    
    uglify: { // Uglify javascript from target/generated-sources/javascript into src/main/static/javascript 
    	js: {	
    		files: [{
    			cwd: '<%%= basic.gen %>/javascript',	
    			src : [ '**/*.js' ],	
    			dest: '<%%= basic.dist %>/javascript', 
    			expand: true
    		}],
    		options: {	
        		beautify: debugJs, 
        		sourceMap: true, 
        		sourceMapIncludeSources: true, 
        		mangle: debugJs ? false : {}, 
        		compress: debugJs ? false : {},
        		wrap: true
        	}
    	},
    	// Disable during debug
    	bower: {
    		files: debugJs ? [] : [{
    			cwd: '<%%= basic.gen %>/lib',	
    			src : [ '**/*.js'],	
    			dest: '<%%= basic.dist %>/lib', 
    			expand: true
    		}],
    		options: {	
	    		beautify: false, 
	    		sourceMap: false, 
	    		mangle: true, 
	    		compress: true,
	    		wrap: false
	    	}
    	}
    },
    bower: { // Install your bower dependencies to src/main/static/lib
        copy: { 
        	options: { 
        		targetDir:  debugJs ? '<%%= basic.dist %>/lib': '<%%= basic.gen %>/lib', 
        		layout: function(type, component, source) {
        			// We maintain the original bower layout, but only include main files
        			var tokens = source.split("/");
        			var end = tokens.length < 3 ? tokens.length : tokens.length - 1;
        			return tokens.slice(1, end).join("/");
        		}
        	} 
        }
    },
    cssmin: { // minify bower resources
        bower : {
            files: [{
      	      expand: true,
    	      cwd: '<%%= basic.gen %>/lib',
    	      src: ['*/*.css', '*/*/*.css'],
    	      dest: '<%%= basic.dist %>/lib',
    	      ext: '.css'
    	    }]
        },
	    options: {
	    	//debug: true,
	    	rebase: false,
	    	processImport: false
	    }
    },
    injector: { // auto inject application files into page layout
		  applicationResources: {
			  files: [{   // Application javascript
						  expand: true,
						  cwd: '<%%= basic.dist %>/javascript/',
						  src: debugJs ? ['**/*.js', '!application.js'] : ['application.js']
					  },
					  {   // Fonts
						  expand: true,
						  cwd: '<%%= basic.dist %>/fonts/',
						  src: ['**/*.css']
					  },
					  {   // Application styles
						  expand: true,
						  cwd: '<%%= basic.dist %>/styles/',
						  src: ['**/*.css']
					  }]			  
		  },
		  options: {
			  relative: false,
			  destFile: 'src/main/webapp/WEB-INF/tags/layout.tag', 
			  ignorePath: 'src/main/webapp'
		  },
	},
	wiredep: { // auto inject bower files into page layout (in dependency order
		bowerResources: {
		    src: ['src/main/webapp/WEB-INF/tags/layout.tag'],
		    options: {
		    	ignorePath: "../../../../../bower_components/",
		    	fileTypes: {
		    	    tag: {
		    	      block: /(([ \t]*)<!--\s*bower:*(\S*)\s*-->)(\n|\r|.)*?(<!--\s*endbower\s*-->)/gi,
		    	      detect: {
		    	        js: /<script.*src=['"]([^'"]+)/gi,
		    	        css: /<link.*href=['"]([^'"]+)/gi
		    	      },
		    	      replace: {
		    	    	  js: '<script src="/static/lib/{{filePath}}"></script>',
		        	      css: '<link rel="stylesheet" href="/static/lib/{{filePath}}" />'
		    	      }
		    	    }
		    	},
				exclude: [ /bootstrap.css/ ]
		    }
		}
	},
	cacheBust: {
	    options: {
	    	rename: false
	    },
	    assets: {
	      files: [{
	          expand: true,
	          cwd: 'src/main/webapp/WEB-INF/tags/',
	          src: ['layout.tag'],
	          baseDir: "<%%= basic.dist %>/../"
	        }] 
	    }
	},
      
    /**
     * Watch for changes to the asset groups and re-process as necessary.
     */
    watch: {
    	gruntfile: 	{ tasks: ['build'],								files: [ 'Gruntfile.js'] },
    	bower: 		{ tasks: ['process-bower', 'process-layout'],	files: ['bower.json'] },
    	css: 		{ tasks: ['process-css'], 						files: ['<%%= basic.src %>/css/**/*.css'] },
    	favicon: 	{ tasks: ['process-favicon'],					files: ['<%%= basic.src %>/images/favicon/*.<%%= extensions.images %>'] },
    	fonts: 		{ tasks: ['process-fonts'], 					files: ['<%%= basic.src %>/fonts/**/*.<%%= extensions.fonts %>'] },
    	images: 	{ tasks: ['process-images'],					files: ['<%%= basic.src %>/images/**/*.<%%= extensions.images %>'] },
    	js: 		{ tasks: ['process-js', 'process-layout'],		files: ['<%%= basic.src %>/javascript/**/*.js'] },
    	less: 		{ tasks: ['process-css', 'process-layout'],		files: ['<%%= basic.src %>/less/**/*.less' ] },
    	layout: 	{ tasks: ['process-layout'],					files: ['src/main/webapp/WEB-INF/tags/layout.tag' ] },
    	templates: 	{ tasks: ['process-templates'],					files: ['<%%= basic.src %>/templates/**/*.html'] },
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
				port : '<%%= yeoman.port + 1 %>'
             	}]
         	}
      	}
  	});

  	grunt.registerTask('default', [
         'build',
         'test',
         'configureProxies',  
         'connect:server',
         'watch'
    ]);
  	
	grunt.registerTask('build', [
		'clean:static',
		'process-bower',
		'process-favicons',
		'process-templates',
		'process-images',
		'process-fonts',
		'process-css',
		'process-js',	
		'process-layout'
    ]);
	grunt.registerTask('test', [
	                            
	]);
	
	grunt.registerTask('process-favicons', [
        'favicons'
	]);
	grunt.registerTask('process-js', [
	    'jshint:js',
		'ngAnnotate:js',
		'concat:js',
		'uglify:js'	
	]);
	
	// Extract main files, copy non-js resources, minify js resources
	grunt.registerTask('process-bower', [
        'bower',
        'cssmin:bower',
        'copy:bower',
        'uglify:bower'
	]);
	
	grunt.registerTask('process-css', [
        'copy:css',
  	    'less',
  	    'postcss'
  	]);
	
	grunt.registerTask('process-fonts', [
	     'copy:fonts',
	     'goog-webfont-dl'
	]);
	
	grunt.registerTask('process-templates', [
         'copy:templates'
	]);
	grunt.registerTask('process-layout', [
		'injector',
		'wiredep',
		'cacheBust'
    ]);
	
	grunt.registerTask('process-images', [
       'copy:images'
 	]);
	
	
};
