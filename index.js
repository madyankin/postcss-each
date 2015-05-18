var postcss = require('postcss');

module.exports = postcss.plugin('postcss-each', function(opts) {
  opts = opts || {};

  function paramsList(params) {
    var params = params.split('in');

    var name = params[0]
      .replace('$', '')
      .trim();

    var values = params[1]
      .split(',')
      .map(function(value) { return value.trim() });

    return {
      name:             name,
      interpolatedName: '$(' + name + ')',
      nameRegexp:       new RegExp('\\$\\(?' + name + '\\)?', 'g'),
      values:           values
    };
  }

  function processValue(node, value, params) {
    var clone = node.clone();

    clone.selector = clone.selector.replace(params.nameRegexp, value);

    clone.eachDecl(function(decl) {
      decl.value = decl.value.replace(params.interpolatedName, value);
    });

    return clone;
  }

  function iterateRules(rule, params) {
    rule.nodes.forEach(function(node) {
      params.values.forEach(function(value) {
        var processedNode = processValue(node, value, params);
        rule.parent.insertBefore(rule, processedNode);
      });

      node.removeSelf();
    });
  }

  return function(css) {
    css.eachAtRule('each', function(rule) {
      var params = paramsList(rule.params);
      iterateRules(rule, params);
      rule.removeSelf();
    });
  };

});
