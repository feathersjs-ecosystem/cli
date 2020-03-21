# Feathers CLI

[![CI](https://github.com/feathersjs/cli/workflows/CI/badge.svg)](https://github.com/feathersjs/cli/actions?query=workflow%3ACI) ![Dependency status](https://david-dm.org/feathersjs/cli.svg)

The command line interface for Feathers applications

## Installation

```bash
npm install -g @feathersjs/cli
```

## Usage

```
$ mkdir myproject

$ cd myproject

$ feathers help

  Usage: feathers generate [type]


  Options:

    -V, --version  output the version number
    -h, --help     output usage information


  Commands:

    generate|g [type]  Run a generator. Type can be
    	• app - Create a new Feathers application in the current folder
    	• authentication - Set up authentication for the current application
    	• connection - Initialize a new database connection
    	• hook - Create a new hook
    	• middleware - Create an Express middleware
    	• service - Generate a new service
    	• plugin - Create a new Feathers plugin

    upgrade|u          Try to automatically upgrade to the latest Feathers version
    *

$ feathers generate app

$ npm start
```

## About

Feathers CLI's generators are provided by [generator-feathers](https://github.com/feathersjs/generator-feathers) and [generator-feathers-plugin](https://github.com/feathersjs/generator-feathers-plugin).

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
