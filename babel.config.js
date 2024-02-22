module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@hooks': './src/hooks',
          '@features': './src/features',
          '@config': './src/config',
          '@utils': './src/utils',
          '@styles': './src/styles',
          '@navigation': './src/navigation',
        },
      },
    ],
  ],
};
