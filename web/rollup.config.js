import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import replace from 'rollup-plugin-replace';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'sdk/disco.js',
  output: [
    {
      file:
        process.env.NODE_ENV === 'production'
          ? 'public/disco.js'
          : 'public/disco.dev.js',
      format: 'umd',
      name: 'Disco',
    },
  ],

  plugins: [
    babel({
      presets: [
        [
          'env',
          {
            loose: true,
            uglify: true,
            modules: false,
            targets: {
              browsers: ['> 1%', 'IE >= 9', 'last 2 versions'],
            },
            exclude: [
              'transform-regenerator',
              'transform-es2015-typeof-symbol',
            ],
          },
        ],
        'react',
      ],
      plugins: [
        'external-helpers',
        'transform-object-assign',
        'transform-object-rest-spread',
        'transform-class-properties',
        'transform-react-constant-elements',
        ['transform-react-jsx', { pragma: 'h' }],
      ],
    }),

    nodeResolve(),
    replace({
      exclude: 'node_modules/**',
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    }),
    commonjs({
      namedExports: {
        './node_modules/preact/dist/preact.js': [
          'h',
          'render',
          'Component',
          'cloneElement',
          'options',
        ],
      },
    }),
    filesize(),
    process.env.NODE_ENV === 'production' && uglify(),
  ],
};
