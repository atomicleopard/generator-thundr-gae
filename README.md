# generator-thundr-gae [![Build Status](https://secure.travis-ci.org/atomicleopard/generator-thundr-gae.png?branch=master)](https://travis-ci.org/atomicleopard/generator-thundr-gae)

This [Yeoman](http://yeoman.io) generator will create application scaffolding for a [thundr](http://3wks.github.io/thundr/) application
ready for Google AppEngine which is setup up to use [Maven](http://maven.apache.org/), [Grunt](http://gruntjs.com) and [Bower](http://bower.io).

This is the java hipster's toolchain of choice for modern web apps.

Once you're done, you will be able to:

#### Build all your source and assets with maven:
```
mvn package
```

#### Have live changes to your css, javascript, less, fonts, images watch and processed in realtime 
```grunt``` or ```grunt watch```

#### Run the appengine locally
```
mvn appengine:devserver
```

#### Deploy to appengine
```
mvn appengine:update
```

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

The resulting project will be a standard maven project, with the addition of another source folder.

```src/main/static``` contains all your web assets. The grunt build will copy these to src/main/web/static when
you run it.


```src/main/font``` contains your font files (css, eot, svg, ttf, woff etc)
```src/main/javascript``` contains application javascript, they'll be minified
```src/main/images``` contains image files 
```src/main/less/styles``` contains any less files that should result in an output css file.
```src/main/less/mixins``` contains less mixins used by the less files in styles, but shouldn't result in css themselves
```src/main/styles``` contains any css files that you want output
```src/main/partials``` contains partials, templates and html files 

### generator-thundr-gae

This generator will create application scaffolding for a [thundr](http://3wks.github.io/thundr/) application
ready for Google AppEngine which is setup up to use [Maven](http://maven.apache.org/), [Grunt](http://gruntjs.com) and [Bower](http://bower.io).

This is the java hipster's toolchain of choice for modern web apps.

Once you're done, you will be able to:

#### Build all your source and assets with maven:
```
mvn package
```

#### Have live changes to your css, javascript, less, fonts, images watch and processed in realtime 
```grunt``` or ```grunt watch```

#### Run the appengine locally
```
mvn appengine:devserver
```

#### Deploy to appengine
```
mvn appengine:update
```

This toolchain requires:
Java (duh) in JDK fashion
Maven
Node
Bower (installed globally using node - ```node install -g bower```
Grunt (installed globally using node - ```node install -g grunt```

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
