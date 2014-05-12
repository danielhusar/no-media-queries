'use strict';

var rework = require('rework');
var testMedia = require('css-mediaquery');
var noMedia = require('rework-no-media');
var extend = require('object-extend');
var nmq;

nmq = function(css, opts, rewokOts){
  var defaults = {
    type : 'all',
    width: '10000px'
  };
  var isBuffer = Buffer.isBuffer(css);

  if(isBuffer){
    css = css.toString('utf-8');
  }

  opts = extend(defaults, opts);
  css = rework(css);

  //reduce stylesheet from rules not within media queries or not matching breakpoint
  css.obj.stylesheet.rules = css.obj.stylesheet.rules.filter(function(item){
    if(item.media){
      return testMedia.match(item.media, opts);
    }
    return false;
  });

  var result = css.use(noMedia()).toString(rewokOts);
  return isBuffer ? new Buffer(result) : result;
};

module.exports = nmq;
