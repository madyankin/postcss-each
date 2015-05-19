var postcss = require('postcss');
var vars    = require('postcss-simple-vars');
var list    = postcss.list;

function checkParams(rule) {
  if (rule.params.indexOf('in') == -1) {
    throw rule.error('Missed "in" keyword in @each');
  }

  var params  = rule.params.split('in');
  var name    = params[0].trim();
  var values  = params[1].trim();

  if (!name.match(/\$[_a-zA-Z]\w+/)) {
    throw rule.error('Missed variable name in @each');
  }

  if (!values.match(/(\w+\,?\s?)+/)) {
    throw rule.error('Missed values list in @each');
  }
}

function paramsList(params) {
  var params  = params.split('in');
  var name    = params[0].replace('$', '').trim();
  var values  = list.comma(params[1]);

  return { name: name, values: values };
}

function processRules(rule, params) {
  var values = {};

  rule.nodes.forEach(function(node) {
    params.values.forEach(function(value) {
      var clone = node.clone();
      var proxy = postcss.rule({ nodes: [clone]});

      values[params.name] = value;
      vars({only: values})(proxy);

      rule.parent.insertBefore(rule, clone);
    });

    node.removeSelf();
  });
}

module.exports = postcss.plugin('postcss-each', function(opts) {
  opts = opts || {};

  return function(css) {
    css.eachAtRule('each', function(rule) {
      checkParams(rule);
      var params = paramsList(rule.params);
      processRules(rule, params);
      rule.removeSelf();
    });
  };

});
