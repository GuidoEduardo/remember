const basicRules = {
	'no-console': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
	'no-debugger': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
	'padding-line-between-statements': [
		'error',
		{
			blankLine: 'always',
			prev: [
				'block',
				'block-like',
				'cjs-export',
				'class',
				'export',
				'import',
				'multiline-block-like',
				'multiline-const',
				'multiline-expression',
				'multiline-let',
				'multiline-var',
			],
			next: '*',
		},
		{
			blankLine: 'always',
			prev: ['const', 'let'],
			next: ['block', 'block-like', 'cjs-export', 'class', 'export', 'import'],
		},
		{
			blankLine: 'always',
			prev: '*',
			next: ['multiline-block-like', 'multiline-const', 'multiline-expression', 'multiline-let', 'multiline-var'],
		},
		{ blankLine: 'any', prev: ['export', 'import'], next: ['export', 'import'] },
	],
	'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
	'no-nested-ternary': 'error',
	curly: ['error', 'multi-line'],
};

const tsRules = {
	'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
	'@typescript-eslint/ban-ts-comment': 'off',
	'@typescript-eslint/no-explicit-any': 'off',
};

const getExtends = (configs = []) => [
	'eslint:recommended',
	...configs,
	'prettier',
];

/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	extends: getExtends(),
	rules: basicRules,
	parserOptions: {
		ecmaVersion: 2022,
		sourceType: 'module',
	},
	reportUnusedDisableDirectives: true,
	overrides: [
		{
			files: ['*.ts'],
			parserOptions: {
				parser: '@typescript-eslint/parser',
			},
			plugins: ['@typescript-eslint'],
			extends: getExtends([
				'plugin:@typescript-eslint/recommended',
			]),
			rules: {
				...require('@typescript-eslint/eslint-plugin').configs['eslint-recommended'].overrides[0].rules,
				...tsRules			
            },
		},
	],
};