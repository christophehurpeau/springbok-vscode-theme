// Not createLintStagedConfig from @pob/root: it always runs eslint, which this
// repo does not use.
export default {
  '*': 'oxfmt --no-error-on-unmatched-pattern',
  '{scripts/**/*.ts,tsconfig.json,package.json}': () => 'tsc',
};
