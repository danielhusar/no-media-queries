#!/usr/bin/env node
'use strict';
var fs = require('fs');
var pkg = require('./package.json');
var nmq = require('./index');
var input = process.argv[2];

function stdin(cb) {
  var ret = '';
  process.stdin.on('data', function (data) { ret += data });
  process.stdin.on('end', cb.bind(null, ret));
}

function help() {
  console.log(pkg.description);
  console.log('');
  console.log('Usage:');
  console.log('  $ nmq <file> > <new-file>');
  console.log('');
  console.log('Example:');
  console.log('  $ nmq responsive.css > non-responsive.css');
  console.log('');
  console.log('Custom options:');
  console.log('Non Media Quaries options with one dash "-", rewok options with two dash "--"');
  console.log('  $ nmq responsive.css > non-responsive.css --width=200px --compress=true');
}

function init(data) {
  var mqOpts = {};
  var reOpts = {};
  process.argv.forEach(function (val) {
    var item = val.split('=');
    if(item[1]){
      if(item[0].match(/--/)){
        reOpts[item[0].replace(/[-]{1,2}/, '')] = item[1];
      }else{
        mqOpts[item[0].replace(/[-]{1,2}/, '')] = item[1];
      }
    }
  });
  process.stdout.write(nmq(data, mqOpts, reOpts));
}

if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
  help();
  return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  return;
}

if (process.stdin.isTTY) {
  if (!input) {
    help();
    return;
  }

  init(fs.readFileSync(input));
} else {
  stdin(init);
}
