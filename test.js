'use strict';
var should = require('should');
var nmq = require('./index.js');

describe('Non responsive tests', function(){

  it('It should return empty string', function () {
    nmq('a{color:blue}').should.equal('');
  });

});

describe('Responsive tests', function(){

  it('simple test', function () {
    nmq('a{color:blue} @media all and (min-width: 500px){a{color:red;}}', {}, {compress: true}).should.equal('a{color:red;}');
  });

  it('Combined test', function () {
    nmq('a{color:blue} @media all and (min-width: 500px) and (max-width: 10000px){a{color:red;}}', {}, {compress: true}).should.equal('a{color:red;}');
  });

  it('Non matching simple test', function () {
    nmq('a{color:blue} @media all and (max-width: 9999px){a{color:red;}}', {}, {compress: true}).should.equal('');
  });

  it('Non matching combined test', function () {
    nmq('a{color:blue} @media all and (min-width: 500px) and (max-width: 9999px){a{color:red;}}', {}, {compress: true}).should.equal('');
  });

});

describe('Custom options', function(){

  it('Matching optios', function () {
    nmq('a{color:blue} @media all and (min-width: 500px){a{color:red;}}', {width: '500px'}, {compress: true}).should.equal('a{color:red;}');
  });

  it('Non matching options', function () {
    nmq('a{color:blue} @media all and (min-width: 501px){a{color:red;}}', {width: '500px'}, {compress: true}).should.equal('');
  });

  it('Matching options without compress', function () {
    nmq('a{color:blue} @media all and (min-width: 500px){a{color:red;}}', {width: '500px'}).should.equal('a {\n  color: red;\n}');
  });

});
