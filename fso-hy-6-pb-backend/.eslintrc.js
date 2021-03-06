/* eslint-disable no-mixed-spaces-and-tabs */
module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 11
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
	    'eqeqeq': 'error',
    	'no-trailing-spaces': 'error',
    	'object-curly-spacing': [
      'error', 'always'
    	],
    	'arrow-spacing': [
        	'error', { 'before': true, 'after': true }
    	]
  }
}
