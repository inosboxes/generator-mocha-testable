'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    yosay('Welcome to ' + chalk.red('generator-mocha-testable-class') + ' generator!');

    const prompts = [
      {
        type: 'input',
        name: 'srcDir',
        message: 'Please define module sources directory.',
        store: true,
        default: 'src'
      },
      {
        type: 'input',
        name: 'testDir',
        message: 'Please define tests directory.',
        store: true,
        default: 'test'
      },
      {
        type: 'input',
        name: 'className',
        message: 'Please define a class name.',
        default: 'Core'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    let name = this.props.className;
    let srcDir = this.props.srcDir;
    let testDir = this.props.testDir;
    let dfile = 'dummyfile.txt';
    let metaData = { Name: name };

    this.fs.copy(this.templatePath(dfile), this.destinationPath(dfile));

    this.fs.copyTpl(
      this.templatePath('esclass.ejs'),
      this.destinationPath(srcDir + '/' + name + '.js'),
      metaData
    );

    this.fs.copyTpl(
      this.templatePath('estest.ejs'),
      this.destinationPath(testDir + '/' + name + '.spec.js'),
      metaData
    );
  }

  install() {
    // Commented : this.installDependencies();
  }
};
