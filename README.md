
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
- a simple server
- files watch + live reload
- js linting (eshint)
- one of the [starting templates](https://github.com/nerik/generator-cartodb/tree/master/app/templates/carto-templates)
- optional: a gist created for you
- optional: es6 to es5 (babel)
- optional: postCSS (for now only has autoprefixer)
- npm is used as the task runner handling (see scripts section in [package.json](https://github.com/nerik/generator-cartodb/blob/master/package.json))

Filenames are optimized to appear in a nice order on gists/bl.ocks

Todo :
- add more postCss plugins
- automatic thumbnail generation for bl.ocks?
