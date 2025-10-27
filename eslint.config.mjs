import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import refreshPlugin from 'eslint-plugin-react-refresh';

export default tseslint.config(
  {
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react': pluginReact,
      'react-hooks': hooksPlugin,
      'react-refresh': refreshPlugin,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',
    },
    settings: {
        react: {
            version: 'detect',
        }
    }
  }
);
