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

  opts = extend(defaults, opts);
  css = rework(css);

  css.obj.stylesheet.rules = css.obj.stylesheet.rules.filter(function(item){
    if(item.media){
      return testMedia.match(item.media, opts);
    }
    return false;
  });

  return css.use(noMedia()).toString(rewokOts);
};

module.exports = nmq;
