/* jsRules: true still applying 'object-literal-sort-keys' rule for some reason */
const rules = {
    'ter-indent': [true, 4],
    'semicolon': {
        'options': 'never'
    },
    'quotemark': {
        'options': ['single', 'jsx-double']
    },
    'arrow-parens': false,
    'trailing-comma': false,
    'ordered-imports': false,
    'no-var-requires': false,
    'no-console': false,
    'object-literal-sort-keys': false,
    'no-trailing-whitespace': [true, 'ignore-jsdoc'],
}

module.exports = {
    extends: [
        'tslint:recommended',
        'tslint-eslint-rules'
    ],
    rules,
    jsRules: rules,
    rulesDirectory: []
}
