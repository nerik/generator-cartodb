
First, install dependencies :
```
npm i
```

Then :
```
npm run dev
```

Tada ! You get a lightweight but complete dev environnement with
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
- add multiple templates to the Yo generator
