module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                useBuiltIns: 'usage',
                debug: false,
                corejs: 3,
            },
        ],
        ['@babel/preset-react'],
    ],
    plugins: ['@babel/plugin-syntax-dynamic-import'],
};
