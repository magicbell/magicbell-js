module.exports = {
  stories: [
    { directory: '../stories', files: '**/*.stories.(js|jsx|ts|tsx)' },
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-essentials'
  ],
  staticDirs: ['../public'],
  babel: async (options) => {
    return {
      ...options,
      presets: [
        ['@babel/preset-env', { shippedProposals: true, loose: true }],
        '@babel/preset-typescript',
        ['@babel/preset-react', { runtime: 'classic' }],
        '@babel/preset-flow',
      ],
    };
  },
  features: {
    previewCsfV3: true,
  }
};
