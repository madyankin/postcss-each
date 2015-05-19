var postcss = require('postcss');
var list    = postcss.list;

module.exports = postcss.plugin('postcss-each', function(opts) {
  opts = opts || {};

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
      checkParams(rule);
      var params = paramsList(rule.params);
      processRuleNodes(rule, params);
      rule.removeSelf();
    });
  };

});
