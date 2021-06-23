module.exports = {
	envs: ['node', 'jest'],
	semicolon: false,
	prettier: true,
	rules: {
		'unicorn/prefer-module': 'off',
		'unicorn/prefer-node-protocol': 'off'
	},
	ignores: ['_templates']
}
