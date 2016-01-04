
This is a [yo](http://yeoman.io/) generator that will quickly set up the perfect dev environment to make visualizations with [CartoDB](https://cartodb.com/) APIs and client-side library.



First, install yo :
```
npm i -g yo
```

(Temp workflow before submitting this to npm) Clone this repo, cd in it, then
```
npm link
```

Then :

```
mkdir MyViz
cd MyViz
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
- turn into a Yo Generator
- bootstrap gists/bl.ocks with proper name :
```
gistup
gistup-rename $title
touch ' .$title'
```
- automatic thumbnail generation for bl.ocks?
- add multiple templates to the Yo generator
