module.exports = {
    extends: ['stylelint-config-standard', 'stylelint-config-standard-scss', 'stylelint-config-tailwindcss'],
    plugins: ['stylelint-scss'],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'extend', 'use', 'function', 'return', 'include'],
            },
        ],
        'block-opening-brace-newline-after': null,
        'block-opening-brace-space-before': null,
        'declaration-colon-space-after': null,
        'declaration-empty-line-before': null,
        'declaration-block-trailing-semicolon': null,
        'function-name-case': null,
        indentation: null,
        'max-empty-lines': null,
        'no-descending-specificity': null,
        'no-empty-source': null,
        'no-eol-whitespace': null,
        'no-missing-end-of-source-newline': null,
        'number-leading-zero': null,
        'rule-empty-line-before': null,
        'no-invalid-position-at-import-rule': null,
        'scss/at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'extend', 'use', 'function', 'return', 'include'],
            },
        ],
        'scss/at-import-partial-extension': null,
        'scss/dollar-variable-colon-space-after': null,
        'scss/dollar-variable-empty-line-before': null,
        'scss/dollar-variable-pattern': null,
        'scss/at-function-pattern': null,
    },
    ignoreFiles: ['./build/**/*.css'],
};
