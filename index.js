var postcss = require('postcss');
var list    = postcss.list;

module.exports = postcss.plugin('postcss-each', function(opts) {
  opts = opts || {};

  function paramsList(params) {
    var params  = params.split('in');
    var name    = params[0].replace('$', '').trim();
    var values  = list.comma(params[1]);

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

  function processRuleNodes(rule, params) {
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
      processRuleNodes(rule, params);
      rule.removeSelf();
    });
  };

});
