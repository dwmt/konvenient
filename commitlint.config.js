module.exports = {
	plugins: ['@dwmt/commitlint-plugin-jira-type'],
	extends: ['@dwmt/commitlint-config-jira-type'],
	rules: {
		// 2 sets the level of this rule to error.
		// always means that this rule should be applied as is
		// (the other value is "never", which inverts the rule)
		'jira-type-project-key-enum': [2, 'always', ['KONVENIENT']],
	},
}
