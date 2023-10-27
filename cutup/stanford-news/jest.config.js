const path = require('path');

module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)', '**/__jest__/**/*.spec.[jt]s?(x)'],
    moduleDirectories: ['node_modules', path.join(__dirname, 'src/modules'), './src', './'],
    moduleNameMapper: {
        '\\.(s?css|less)$': 'identity-obj-proxy',
        '^.+\\.svg$': '<rootDir>/jest/svgTransform.js',
    },
};
