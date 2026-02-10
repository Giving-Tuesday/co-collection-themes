import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    { name: '@storybook/addon-essentials', options: { docs: false } },
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
  docs: {
    autodocs: false,
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      css: {
        modules: {
          localsConvention: 'camelCaseOnly',
        },
      },
    });
  },
};

export default config;
