const { BABEL_ENV } = process.env;
const babelEnv = BABEL_ENV || 'cjs';

// babelEnv가 es면 preset-env 필요없음.
// umd나 modules면 false, 아니면 cjs
let defaultPresets = [];
if (babelEnv !== 'es') {
  defaultPresets = [
    [
      '@babel/env',
      {
        modules: ['umd', 'modules'].includes(babelEnv) ? false : 'commonjs',
      },
    ],
  ];
}

module.exports = {
  presets: [...defaultPresets, ['@babel/react'], ['@babel/typescript']],
  // babel이 사용하는 함수들을 각 파일별로 만들어 냄. @transform-runtime 플러그인을 사용하면 이를 '@babel/runtime'에서 공통으로 가져옴.
  // @babel/runtime이 디펜던시에 있는 이유
  plugins: [
    ['@babel/plugin-transform-runtime', { useESModules: babelEnv !== 'cjs' }],
  ],
};
