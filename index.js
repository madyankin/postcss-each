import postcss  from 'postcss';
import vars     from 'postcss-simple-vars';

const SEPARATOR = /\s+in\s+/;

function checkParams(params) {
  if (!SEPARATOR.test(params)) return 'Missed "in" keyword in @each';

  const [name, values] = params.split(SEPARATOR).map(str => str.trim());

  if (!name.match(/\$[_a-zA-Z]?\w+/)) return 'Missed variable name in @each';
  if (!values.match(/(\w+\,?\s?)+/)) return 'Missed values list in @each';

  return null;
}

function tokenize(str) {
  return postcss.list.comma(str).map(str => str.replace(/^\$/, ''));
}

function paramsList(params) {
  let [vars, values] = params.split(SEPARATOR).map(tokenize);
  let matched = false;

  values = values.map(value => {
    let match = value.match(/^\((.*)\)$/);
    if (match) matched = true;
    return match ? postcss.list.comma(match[1]) : value;
  });

  values = matched ? values : [values];

  return {
    names:     values.map((_, i) => vars[i]),
    indexName: vars[values.length],
    values:    values,
  };
}

function processRules(rule, params) {
  params.values[0].forEach((_, i) => {
    let vals = {};

    params.names.forEach((name, j) => {
      vals[name] = params.values[j][i];
    });

    if (params.indexName) vals[params.indexName] = i;

    rule.nodes.forEach(node => {
      const clone = node.clone();
      const proxy = postcss.rule({ nodes: [clone] });

      vars({ only: vals })(proxy);
      rule.parent.insertBefore(rule, clone);
    });
  });
}

function processEach(rule) {
  const params  = ` ${rule.params} `;
  const error   = checkParams(params);
  if (error) throw rule.error(error);

  const parsedParams = paramsList(params);
  processRules(rule, parsedParams);
  rule.remove();
  processLoop(rule.root());
}

function rulesExists(css) {
  let rulesLength = 0;
  css.walkAtRules('each', () => rulesLength++);
  return rulesLength;
}

function processLoop(css, opts) {
  const hasPlugins = opts && opts.plugins;

  if (hasPlugins && opts.plugins.afterEach && opts.plugins.afterEach.length) {
    css = postcss(opts.plugins.afterEach).process(css).root;
  }

  css.walkAtRules('each', processEach);

  if (hasPlugins && opts.plugins.beforeEach && opts.plugins.beforeEach.length) {
    css = postcss(opts.plugins.beforeEach).process(css).root;
  }

  if (rulesExists(css)) processLoop(css, opts);
};

export default postcss.plugin('postcss-each', (opts) => {
  opts = opts || {};
  return (css, result) => processLoop(css, opts);
});
