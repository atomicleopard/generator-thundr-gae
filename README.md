# generator-thundr-gae [![Build Status](https://travis-ci.org/atomicleopard/generator-thundr-gae.svg)](https://travis-ci.org/atomicleopard/generator-thundr-gae)

[![thundr Logo](http://3wks.github.io/thundr/2.0/static/img/logoFullSmall.png)](http://3wks.github.io/thundr/) 

This [Yeoman](http://yeoman.io) generator will create application scaffolding for a [thundr](http://3wks.github.io/thundr/)/AngularJS application
ready for Google AppEngine which is setup up to use [Maven](http://maven.apache.org/), [Grunt](http://gruntjs.com) and [Bower](http://bower.io).

This is the java hipster's toolchain of choice for modern web apps.

Once you're done, you will be able to:

#### Build all your source and assets with maven:

    mvn package

#### Deploy to appengine

    mvn appengine:update -PenvironmentName

#### Have live changes to your css, javascript, less, fonts, images watch and processed in realtime 
``grunt`` while running your app.

##### Run the appengine locally

    mvn appengine:devserver

##### Debug in Eclipse using the GPE and grunt watch
Create a run-config in Eclipse using the GPE for a standard maven webapp on port 8080.
Run grunt on the command line using ``grunt``

##### Debug in IntelliJ using the Google Plugin and grunt watch
Create a run config in IntelliJ on port 8081
Run grunt on the command line or IntelliJ's grunt integration ``grunt``. This circumvents issues with IntelliJ not sycning file changes properly without frame
deactivation followed by reactivation.


## Required dependencies ##

This toolchain requires:

* Java in JDK fashion
* Maven
* Node
* Bower (installed globally using npm - ``npm install -g bower``)
* Grunt (installed globally using npm - ``npm install -g grunt``)
* This generator installed (``npm install -g generator-thundr-gae``)
* ImageMagick installed (as per [grunt-favicons](https://github.com/gleero/grunt-favicons))

Then just run the generator in your desired project directory and answer the questions:
``
mkdir my-project;
cd my-project;
yo thundr-gae
``

# What does it do:

Projects generated have a tip-top build pipeline

### Java Dependencies
 
  * manages maven dependencies based on your pom.xml
  * Includes your java source in an output war - ``/src/main/java/``
  * Includes your application resources - ``/src/main/resources/``
  * Includes your application web assets - ``/src/main/webapp/``
  * Runs unit tests with surefire, all classes ending in *Test.java in ``/src/test/java/``
  * Runs integration tests with failsafe, all classes ending in *IT.java in ``/src/int-test/java/``
  * Creates a standard thundr-gae application layout, including ``ApplicationModule``, ``Routes``, a placeholder
    controller and matching jsp and a reusable layout.tag
  
### Bower Dependencies

  * manages bower dependencies based on bower.json
  * copies bower dependencies to output war to ``/src/main/webapp/static/lib/``
  * automatically injects bower resources (js, css) into your page template(s) (layout.tag by default)
  * watches for changes automatically updating your war on the fly during debug
  * Creates a standard angularjs application rooted in ``app.js``, using ``ui-router``, ``ui-bootstrap``,
    ``angular-moment`` and bootstrap and font-awesome. 
  
###  Manages application CSS

  * Copies CSS to your output war from ``/src/main/static/css/``  
  * Generates CSS from less in ``/src/main/static/less/styles/`` 
  * automatically injects application css into your page template(s) (layout.tag by default)
  * watches for changes automatically updating your war on the fly during debug
  
### Manages application JS

  * Minifies and concatenates javascript to your output war from ``/src/main/static/javascript``
  * automatically puts angular dependencies into AMD style array, e.g. you can write a controller as ``function($scope, $stateParams...){}`` and it will be converted to ``['$scope', '$stateParams', ... function($scope, $stateParams...){}]``
  * runs jshint on application javascript
  * automatically injects application js into your page template(s) (layout.tag by default)
  * watches for changes automatically updating your war on the fly during debug
  
### Manages application images

  * Generates your favicon and apple/android/microsoft variants off a single png image ``/src/main/static/images/favicon/original.png``
  * automatically injects favicons and variants into your page template(s) (layout.tag by default)
  * Copies images to output war from ``/src/main/static/images``
  
 
  
## Project layout

The resulting project will be a standard maven project, with the addition of extra source folders.

* ``src/main/java`` contains all your application code
* ``src/main/java/ApplicationModule.java`` your thundr application module
* ``src/main/java/controllers/Routes.java`` your thundr application routes
* ``src/main/webapp/`` your standard maven webapp folder
* ``src/test/java/`` java unit tests
* ``src/int-test/java/`` java integration tests
* ``src/main/static`` contains all your web assets. The grunt build will copy/process these to src/main/webapp/static when you run.
* ``src/test/static`` contains tests for your web assets.

* ``src/main/static/css`` contains any css files that you want output, these are injected into layout.tag for you
* ``src/main/static/font`` contains your font files (css, eot, svg, ttf, woff etc)
* ``src/main/static/images`` contains image files
* ``src/main/static/images/favicon`` contains 'original.png' - this will be generated into favicon and applicaiton icons automatically
* ``src/main/static/javascript`` contains application javascript, they'll be minified, concatenated and injected into layout.tag for you. Any angular code that uses dependency injection will be processed so that injections works after minification
* ``src/main/static/less/styles`` contains any less files that should result in an output css file, injected into layout.tag for you
* ``src/main/static/less/mixins`` contains less mixins used by the less files in styles, but shouldn't result in css themselves
* ``src/main/static/templates`` contains partials, templates and html files 



### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

``
$ npm install -g yo
``

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-thundr-gae from npm, run:

``
$ npm install -g generator-thundr-gae
``

Finally, initiate the generator:

``
$ yo thundr-gae
``

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
