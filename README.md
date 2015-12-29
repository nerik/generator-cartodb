
First, install dependencies :
```
npm i
```

Then :
```
npm run dev
```

Tada ! A browser opens on [something like that](http://bl.ocks.org/nerik/22d1b831133180adcd66), and you get a lightweight but complete dev environnement, with :
- es6 to es5 (babel)
- postCSS (for now only has autoprefixer)
- a server
- js and css watch
- live reload

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
