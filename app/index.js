var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var libs = [
  {
    name: 'jquery',
    message: 'Should I include jQuery?',
    path: 'node_modules/jquery/dist/jquery.min.js',
    default: true
  },
  {
    name: 'underscore',
    message: 'Should I include underscore?',
    path: 'node_modules/underscore/underscore-min.js',
    default: true
  }
]

module.exports = generators.Base.extend({
  constructor: function () {
  // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the ' + chalk.red('CartoDB') + ' generator!'
    ));

    var prompts = [
      {
        name: 'projectName',
        message: 'What is your project name?',
        default: 'cartodb-viz'
      },
      {
        name: 'projectDescription',
        message: 'A description for your project?',
        default: 'A visualization made with CartoDB.'
      }
    ].concat(libs);

    this.prompt(prompts, function(props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    this.props.libsPaths = [];
    this.props.libsDeps = [];

    libs.forEach(function (currentValue) {
      if (this.props[currentValue.name] === true) {
        this.props.libsPaths.push(currentValue.path);
        this.props.libsDeps.push('"' + currentValue.name + '" : "*"');
      }
    }.bind(this))

    this.copy('package.json', 'package.json');
    this.copy('.gitignore', '.gitignore');
    this.copy('index.html', 'index.html');
    this.copy('main.css', 'main.css');
    this.copy('main.js', 'main.js');
  },
  install: function () {
    this.npmInstall();
  }
});
