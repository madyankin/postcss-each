import postcss  from 'postcss';
import vars     from 'postcss-simple-vars';

const SEPARATOR = /\s+in\s+/;

function checkParams(params) {
  if (!SEPARATOR.test(params)) return 'Missed "in" keyword in @each';

  const paramsList  = params.split(SEPARATOR);
  const name        = paramsList[0].trim();
  const values      = paramsList[1].trim();

  if (!name.match(/\$[_a-zA-Z]?\w+/)) return 'Missed variable name in @each';
  if (!values.match(/(\w+\,?\s?)+/)) return 'Missed values list in @each';

  return null;
}

function paramsList(params) {
  const paramsList  = params.split(SEPARATOR);
  const vars        = paramsList[0].split(',');
  const valueName   = vars[0];
  const indexName   = vars[1];

  return {
    valueName:  valueName.replace('$', '').trim(),
    indexName:  indexName && indexName.replace('$', '').trim(),
    values:     postcss.list.comma(paramsList[1])
  };
}

function processRules(rule, params) {
  const values = {};

  rule.nodes.forEach((node) => {
    params.values.forEach((value, index) => {
      const clone = node.clone();
      const proxy = postcss.rule({ nodes: [clone] });

      values[params.valueName] = value;
      if (params.indexName) values[params.indexName] = index;

      vars({ only: values })(proxy);

      rule.parent.insertBefore(rule, clone);
    });
  });
}

function processEach(rule) {
  processLoop(rule);

  const params  = ` ${rule.params} `;
  const error   = checkParams(params);
  if (error) throw rule.error(error);

  const parsedParams = paramsList(params);
  processRules(rule, parsedParams);
  rule.removeSelf();
}

function processLoop(css) {
  css.eachAtRule('each', processEach);
};

export default postcss.plugin('postcss-each', (opts) => {
  opts = opts || {};
  return processLoop;
});
