
This is a [yo](http://yeoman.io/) generator that will quickly set up the perfect dev environment to make visualizations with [CartoDB](https://cartodb.com/) APIs and client-side library.



First, install yo, then the yo CartoDB generator :
```
npm i -g yo generator-cartodb
```

Run the CartoDB generator:
```
yo cartodb
```

Answer the few questions asked by the CLI, then tada ! A browser opens on [something like that](http://bl.ocks.org/nerik/22d1b831133180adcd66), and you get a lightweight but complete dev environment, with :
- es6 to es5 (babel)
- postCSS (for now only has autoprefixer)
- a simple server
- files watch + live reload
- npm is used as a task runner handling all of that (see scripts section in [package.json](https://github.com/nerik/generator-cartodb/blob/master/package.json))

Filenames are optimized to appear in a nice order on gists/bl.ocks

Todo :
- eshint
- add more postCss plugins
- automatic thumbnail generation for bl.ocks?
- add multiple templates to the Yo generator : bootstrap, carto styleguide
