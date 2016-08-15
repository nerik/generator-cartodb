var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var libs = {
  'moment': {
    p: 'node_modules/moment/min/moment-with-locales.min.js',
    v: '2.11.2'
  },
  'av.color': {
    p: 'node_modules/av.color/av.color.js',
    v: '0.0.1'
  },
  'underscore': {
    p: 'node_modules/underscore/underscore-min.js',
    v: '1.8.3'
  },
  'request': {
    v: '2.74.0'
  },
}

var libNames = Object.keys(libs);

var templateChoices = [
  {
    value: 'simple',
    name: chalk.bold('simple') + ' basic template with carto.js'
  }, {
    value: 'leaflet',
    name: chalk.bold('leaflet') + ' a leaflet map without carto.js, but with a few tools to interact with Carto',
    ignoreTemplate: ['mapconfig.json'],
    mandatoryDependencies: ['underscore', 'request']
  }, {
    value: 'cartodb-bootstrap-template',
    name: chalk.bold('cartodb-bootstrap-template') + ' A starter template for creating a fullscreen cartodb.js map with bootstrap navbar (@chriswong)'
  }
];

var prompts = [
  {
    name: 'projectName',
    message: 'What is your project name? (no spaces)',
    default: '(will be replaced by cwd)'
  },
  {
    name: 'projectDescription',
    message: 'A description for your project?',
    default: 'Another awesome CartoDB viz !'
  },
  {
    name: 'gist',
    message: 'Do you want me to create a gist automatically?',
    type: 'confirm',
    default: false
  },
  {
    name: 'transpile',
    message: 'Transpile CSS (PostCSS) and ES6 (babel) ?',
    type: 'confirm',
    default: false
  },
  {
    name: 'username',
    message: 'Your CartoDB username',
    default: 'documentation'
  },
  {
    name: 'libs',
    message: 'Pick optional libraries (remember that _, $ and Backbone are currently already bundled with CartoDB.js)',
    type: 'checkbox',
    choices: libNames.filter(function(libName) { return libs[libName].p; })
  },
  {
    name: 'template',
    message: 'Pick a a template to start with',
    type: 'list',
    choices: templateChoices
  }
];


module.exports = yeoman.Base.extend({

  prompting: function () {

    var done = this.async();

    prompts[0].default = path.basename(process.cwd());

    this.log(yosay(
      'Welcome to the ' + chalk.red('CartoDB') + ' generator!'
    ));

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    this.props.projectName = this.props.projectName.replace(/\s+/g, '');

    this.props.libsPaths = [];
    this.props.libsDeps = [];

    this.props.libs.forEach(function(libName) {
      var lib = libs[libName];

      this.props.libsPaths.push(lib.p);
      this.props.libsDeps.push('"' + libName + '" : "^' + lib.v +'"');
    }.bind(this));

    // include template mandatory deps in package.json, but omit them for js bundle
    var templateProps = templateChoices.find(function (t) { return t.value === this.props.template; }.bind(this));
    if (templateProps.mandatoryDependencies) {
      templateProps.mandatoryDependencies.forEach(function (libName) {
        console.log(this.props)
        if (this.props.libs.indexOf(libName) === -1) {
          this.props.libsDeps.push('"' + libName + '" : "^' + libs[libName].v +'"');
        }
      }.bind(this));
    }


    this.props.mainJs = (this.props.transpile) ? 'zzz-dist.js' : 'index.js';
    this.props.mainCss = (this.props.transpile) ? 'zzz-dist.css' : 'index.css';

    var that = this;
    function copyTpl(src, dest) {
      that.fs.copyTpl(
        that.templatePath(src),
        that.destinationPath(dest),
        that
      );
    }

    copyTpl('package.json','package.json');
    copyTpl('.eslintrc.js','.eslintrc.js');
    copyTpl('tpl.gitignore','.gitignore');

    this.fs.copy(this.templatePath('favicon.ico'), this.destinationPath('favicon.ico'), this);

    var templateFiles = fs.readdirSync(path.join(this.templatePath(), 'carto-templates', this.props.template));

    templateFiles.forEach(function(templateFile) {
      try {
        var src = path.join('carto-templates', this.props.template, templateFile);

        if (templateProps.ignoreTemplate && templateProps.ignoreTemplate.indexOf(templateFile) > -1) {
          this.fs.copy(this.templatePath(src), this.destinationPath(templateFile), this);
        } else {
          copyTpl(src, templateFile)
        }

      } catch (e) {
        console.log(e)
      }
    }.bind(this))

  },

  install: function () {
    this.npmInstall('', {}, function () {
      this.spawnCommand('npm', ['run', 'build']).on('close', function (code) {
        this.log('Ready. Run ' + chalk.bold.green('npm start') + ' to get started');

        if (this.props.gist === true) {
          // create gist
          // TODO get hash from gistup output to display bl.ocks URL as well !
          this.spawnCommand('npm', ['run','gist']);
        }

      }.bind(this));
    }.bind(this));

  }
});
