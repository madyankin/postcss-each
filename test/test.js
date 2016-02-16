import postcss from 'postcss';
import assert  from 'assert';
import fs      from 'fs';
import path    from 'path';
import plugin  from '../';

const casesPath = path.join(__dirname, '/cases');

const cases = {
  'multiple-values':              'iterates through given values',
  'one-value':                    'iterates through one value',
  'short-names':                  'iterates short names',
  'value-with-index':             'iterates value and index',
  'multiple-assignment':          'iterates and assigns multiple values',
  'multiple-selectors':           'respects multiple selectors',
  'with-in-substring':            'respects properties with `in` substring',
  'multiline-expressions':        'respects multiline expressions',
  'multiple-properties':          'respects multiple properties',
  'other-variables':              'doesn\'t replace other variables',
  'nested-iteration':             'performs nested iteration',
  'nested-iteration-parent-vars': 'performs nested iteration with parent\'s variables',
};

function test(input, expected, opts, done) {
  const result = postcss([plugin(opts)]).process(input);
  assert.equal(result.css, expected);
};

function css(name) {
  const fileName = path.join(casesPath, name + '.css');
  return fs.readFileSync(fileName).toString();
}

describe('postcss-each', () => {
  it('expects valid syntax', () => {
    const missedIn      = () => test('@each $icon foo, bar {}');
    const missedVar     = () => test('@each in foo, bar {}');
    const missedValues  = () => test('@each $icon in {}');

    assert.throws(missedIn, /Missed "in" keyword in @each/);
    assert.throws(missedVar, /Missed variable name in @each/);
    assert.throws(missedValues, /Missed values list in @each/);
  });

  for (let caseName in cases) {
    const description = cases[caseName];

    it(description, () => {
      test(css(caseName), css(caseName + '.expected'));
    });
  }
});
