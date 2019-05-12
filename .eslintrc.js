module.exports = {
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_doc'] }],
    'no-unused-vars': ['error', { args: 'none' }], // 引数は対象外
  },
  overrides: [
    {
      files: "**/_tests/*.spec.js",
      env: {
        mocha: true
      }
    }
  ]
};
