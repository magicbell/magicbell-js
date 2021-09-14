module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
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
};
