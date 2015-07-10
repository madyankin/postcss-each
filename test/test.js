var postcss = require('postcss');
var assert  = require('assert');
var fs      = require('fs');
var path    = require('path');

var plugin    = require('../');
var casesPath = path.join(__dirname, '/cases');

var cases = {
  'multiple-values':        'iterates through given values',
  'one-value':              'iterates through one value',
  'short-names':            'iterates short names',
  'value-with-index':       'iterates value and index',
  'multiple-selectors':     'respects multiple selectors',
  'with-in-substring':      'respects properties with `in` substring',
  'multiline-expressions':  'respects multiline expressions',
  'multiple-properties':    'respects multiple properties',
  'other-variables':        'doesn\'t replace other variables',
  'nested-iteration':       'performs nested iteration'
};

function test(input, expected, opts, done) {
  var result = postcss([plugin(opts)]).process(input).css;
  assert.equal(result, expected);
};

function css(name) {
  var fileName = path.join(casesPath, name + '.css');
  return fs.readFileSync(fileName).toString();
}

describe('postcss-each', function() {

  it('expects valid syntax', function() {
    var missedIn = function() {
      test('@each $icon foo, bar {}');
    };

    var missedVar = function() {
      test('@each in foo, bar {}');
    };

    var missedValues = function() {
      test('@each $icon in {}');
    };

    assert.throws(missedIn, /Missed "in" keyword in @each/);
    assert.throws(missedVar, /Missed variable name in @each/);
    assert.throws(missedValues, /Missed values list in @each/);
  });

  for (var caseName in cases) {
    var description = cases[caseName];

    it(description, function() {
      test(css(caseName), css(caseName + '.expected'));
    });
  }
});
