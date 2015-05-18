var postcss = require('postcss');
var assert  = require('assert');

var plugin = require('../');

function test(input, expected, opts, done) {
  var result = postcss([plugin(opts)]).process(input).css;
  assert.equal(result, expected);
};

describe('postcss-each', function() {

  it('iterates through given values', function() {
    var input     = '@each $icon in foo, bar { .icon-$(icon) { background: url("$(icon).png"); } }';
    var expected  = '.icon-foo {\n    background: url("foo.png")\n}\n' +
                    '.icon-bar {\n    background: url("bar.png")\n}';
    test(input, expected);
  });

  it('iterates through one value', function() {
    var input     = '@each $icon in foo { .icon-$(icon) { background: url("$(icon).png"); } }';
    var expected  = '.icon-foo {\n    background: url("foo.png")\n}';
    test(input, expected);
  });

  it('respects multiple selectors', function() {
    var input     = '@each $icon in foo, bar { .icon-$(icon), .$(icon)' +
                    '{ background: url("$(icon).png"); } }';
    var expected  = '.icon-foo, .foo {\n    background: url("foo.png")\n}\n' +
                    '.icon-bar, .bar {\n    background: url("bar.png")\n}';
    test(input, expected);
  });

  it('respects multiple properties', function() {
    var input     = '@each $icon in foo, bar { .icon-$(icon) {' +
                    'background: url("$(icon).png");' +
                    'content: "$(icon)";' +
                    '}}';
    var expected  = '.icon-foo {\n    background: url("foo.png");\n' +
                                 '    content: "foo"\n}\n' +
                    '.icon-bar {\n    background: url("bar.png");\n' +
                                 '    content: "bar"\n}';
    test(input, expected);
  });

  it('replaces only interpolated values in properties', function() {
    var input     = '@each $icon in foo, bar { .icon-$(icon) {' +
                    'content: "$icon";' +
                    'content: "$(icon)";' +
                    '}}';
    var expected  = '.icon-foo {\n    content: "$icon";\n' +
                                 '    content: "foo"\n}\n' +
                    '.icon-bar {\n    content: "$icon";\n' +
                                 '    content: "bar"\n}';
    test(input, expected);
  });

});
