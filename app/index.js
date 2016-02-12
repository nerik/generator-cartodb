/* eslint-env node */
/* eslint quotes: [2, "simple"] */

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var libs = [
  {
    name: 'jquery',
    path: 'node_modules/jquery/dist/jquery.min.js',
    skipPrompt: true  /* cartodb.js has a hard dependency on jQuery, so thi is not optional */
  },
  {
    name: 'underscore',
    message: 'Should I include underscore?',
    path: 'node_modules/underscore/underscore-min.js',
    default: true
  },
  {
    name: 'moment',
    message: 'Should I include moment.js?',
    path: 'node_modules/moment/min/moment-with-locales.min.js',
    default: true
  },
  {
    name: 'bootstrap',
    message: 'Should I include Bootstrap?',
    path: 'node_modules/bootstrap/dist/js/bootstrap.min.js',
    default: true
  }
]

module.exports = yeoman.Base.extend({
  // constructor: function () {
  // // Calling the super constructor is important so our generator is correctly set up
  //   generators.Base.apply(this, arguments);
  // },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the ' + chalk.red('CartoDB') + ' generator!'
    ));

    var prompts = [
      {
        name: 'projectName',
        message: 'What is your project name? (no spaces)',
        default: 'cartodb-viz'
      },
      {
        name: 'projectDescription',
        message: 'A description for your project?',
        default: 'A visualization made with CartoDB.'
      },
      {
        name: 'gist',
        message: 'Do you want me to create a gist automatically?',
        default: false
      },
      {
        name: 'transpile',
        message: 'Transpile CSS (PostCSS) and ES6 (babel) ?',
        default: false
      }
    ].concat(libs.filter(function(lib) { return lib.skipPrompt !== true; }));

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    this.props.projectName = this.props.projectName.replace(/\s+/g, '');

    this.props.libsPaths = [];
    this.props.libsDeps = [];

    libs.forEach(function (currentValue) {
      if (this.props[currentValue.name] === true || currentValue.skipPrompt === true) {
        this.props.libsPaths.push(currentValue.path);
        this.props.libsDeps.push('"' + currentValue.name + '" : "*"');
      }
    }.bind(this));

    this.props.mainJs = (this.props.transpile) ? 'zzz-dist.js' : 'main.js';
    this.props.mainCss = (this.props.transpile) ? 'zzz-dist.css' : 'main.css';

    var templateFiles = ['package.json', 'gitignore.tpl', 'index.html', 'main.css', 'main.js'];
    templateFiles.forEach(function (templateFile) {
      this.fs.copyTpl(
        this.templatePath(templateFile),
        this.destinationPath(templateFile),
        this
      );
    }.bind(this));
  },

  install: function () {
    this.npmInstall('', {}, function () {
      this.spawnCommand('npm', ['run', 'build']).on('close', function (code) {
        this.log('Ready. Run ' + chalk.green('npm run dev') + ' to get started');

        if (this.props.gist === true) {
          // create gist
          // TODO get hash from gistup output to display bl.ocks URL as well !
          this.spawnCommand('npm', ['run','gist']);
        }

      }.bind(this));
    }.bind(this));

  }
});
