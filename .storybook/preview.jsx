import React from 'react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story, context) => {
    if (context.parameters.layout === 'fullscreen') {
      return React.createElement(Story);
    }
    return React.createElement(
      'div',
      {
        style: {
          padding: 24,
          background: '#f5f5f5',
          fontFamily: 'sans-serif',
        },
      },
      React.createElement(Story),
    );
  },
];
