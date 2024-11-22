const cssSafelistClassArray = [];

import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import tailwindcss from 'tailwindcss';

export default {
  plugins: [
    autoprefixer,
    tailwindcss,
    cssnano({
      preset: 'default',
    }),
    purgeCSSPlugin({
      content: ['./src/**/*.html', './src/**/*.js'],
      fontFace: false,
      safelist: cssSafelistClassArray,
    }),
  ],
};
