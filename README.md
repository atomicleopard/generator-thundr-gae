# generator-thundr-gae [![Build Status](https://secure.travis-ci.org/atomicleopard/generator-thundr-gae.png?branch=master)](https://travis-ci.org/atomicleopard/generator-thundr-gae)

[![thundr Logo](http://3wks.github.io/thundr/static/img/logoFullSmall.png)](http://3wks.github.io/thundr/index.html) 

This [Yeoman](http://yeoman.io) generator will create application scaffolding for a [thundr](http://3wks.github.io/thundr/) application
ready for Google AppEngine which is setup up to use [Maven](http://maven.apache.org/), [Grunt](http://gruntjs.com) and [Bower](http://bower.io).

This is the java hipster's toolchain of choice for modern web apps.

Once you're done, you will be able to:

#### Build all your source and assets with maven:
```
mvn package
```

#### Deploy to appengine
```
mvn appengine:update
```

#### Have live changes to your css, javascript, less, fonts, images watch and processed in realtime 
```grunt``` or ```grunt watch``` while running your app.

##### Run the appengine locally
```
mvn appengine:devserver
```

##### Debug in Eclipse using the GPE and grunt watch
Create a run-config in Eclipse using the GPE for a standard maven webapp on port 8080.
Run grunt on the command line using ```grunt watch```

##### Debug in IntelliJ using the Goolge Plugin and grunt intellij
Create a run config in IntelliJ on port 8081
Run grunt on the command line or IntelliJ's grunt integration ```grunt intellij```. This circumvents issues with IntelliJ not sycning file changes properly without frame
deactivation followed by reactivation.


#### Run all your web tests
```grunt test```


This toolchain requires:
* Java (duh) in JDK fashion
* Maven
* Node
* Bower (installed globally using node - ```node install -g bower```)
* Grunt (installed globally using node - ```node install -g grunt```)
* This generator installed (```npm install -g generator-thundr-gae```)

Then just run the generator in your desired project directory and answer the questions:
```
mkdir my-project;
cd my-project;
yo thundr-gae
```

## Project layout

The resulting project will be a standard maven project, with the addition of extra source folders.

* ```src/main/static``` contains all your web assets. The grunt build will copy these to src/main/web/static when
you run it.
* ```src/test/static``` contains tests for your javascript assets.

* ```src/main/css``` contains any css files that you want output
* ```src/main/font``` contains your font files (css, eot, svg, ttf, woff etc)
* ```src/main/images``` contains image files
* ```src/main/javascript``` contains application javascript, they'll be minified
* ```src/main/less/styles``` contains any less files that should result in an output css file.
* ```src/main/less/mixins``` contains less mixins used by the less files in styles, but shouldn't result in css themselves
* ```src/main/templates``` contains partials, templates and html files 


### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-thundr-gae from npm, run:

```
$ npm install -g generator-thundr-gae
```

Finally, initiate the generator:

```
$ yo thundr-gae
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
