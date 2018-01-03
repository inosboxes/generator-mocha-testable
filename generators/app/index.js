'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    yosay('Welcome to ' + chalk.red('generator-mocha-testable-module') + ' generator!');

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
        type: 'list',
        name: 'style',
        message: 'Choose style.',
        choices: [{ value: 1, name: 'ES' }, { value: 2, name: 'Non ES' }],
        default: 1
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

    let moduleTemplateName;
    let moduleTestTemplateName;

    switch (this.props.style) {
      case 1:
        moduleTemplateName = 'esclass.ejs';
        moduleTestTemplateName = 'estest.ejs';
        break;
      case 2:
        moduleTemplateName = 'non-es-module.ejs';
        moduleTestTemplateName = 'non-es-module-test.ejs';
        break;
      default:
        moduleTemplateName = 'esclass.ejs';
        moduleTestTemplateName = 'estest.ejs';
    }

    this.fs.copyTpl(
      this.templatePath(moduleTemplateName),
      this.destinationPath(srcDir + '/' + name + '.js'),
      metaData
    );

    this.fs.copyTpl(
      this.templatePath(moduleTestTemplateName),
      this.destinationPath(testDir + '/' + name + '.spec.js'),
      metaData
    );
  }

  install() {
    // Commented : this.installDependencies();
  }
};
