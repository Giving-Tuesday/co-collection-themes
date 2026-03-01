import React from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';

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
  (Story) =>
    React.createElement(
      'div',
      {
        style: {
          padding: 24,
          background: '#f5f5f5',
          fontFamily: 'sans-serif',
        },
      },
      React.createElement(Story),
    ),
];
