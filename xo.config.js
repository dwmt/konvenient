module.exports = {
	envs: ['node', 'jest'],
	semicolon: false,
	prettier: true,
	rules: {
		'import/no-unassigned-import': 'off',
		'unicorn/prefer-module': 'off',
		'unicorn/prefer-node-protocol': 'off',
		'unicorn/no-abusive-eslint-disable': 'off',
		'@typescript-eslint/no-require-imports': 'off',
		'@typescript-eslint/no-var-requires': 'off'
	},
	ignores: ['_templates', 'examples'],
	overrides: [
		{
			files: 'test/**/*.test.ts',
			rules: {
				'@typescript-eslint/no-extraneous-class': 'off'
			}
		}
	]
}
