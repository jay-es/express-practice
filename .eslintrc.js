module.exports = {
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint', // @typescript-eslint のルールをいくつか無効化
    'plugin:import/typescript', // import 関連の設定
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_doc'] }],
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }], // 引数は対象外
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true, // 関数式は除外
    }],
  },
  overrides: [
    {
      files: '**/_tests/*.spec.ts',
      env: {
        mocha: true,
      },
    },
    {
      files: '**/_tests/*.ts',
      rules: {
        'import/no-extraneous-dependencies': ['error', {
          devDependencies: true,
        }],
      },
    },
  ],
};
