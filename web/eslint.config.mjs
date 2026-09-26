import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const config = [
  {
    // App code only; build tooling under scripts/ runs (and is verified) in CI,
    // generated and frozen directories are never edited by hand.
    ignores: [
      '.next/**',
      'out/**',
      '.source/**',
      'node_modules/**',
      'scripts/**',
      '_disabled/**',
      '_migration/**',
      'next-env.d.ts',
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default config;
