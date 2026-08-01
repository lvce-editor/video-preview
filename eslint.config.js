import { defineConfig } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([
  ...config.default,
  ...config.recommendedVirtualDom,
  ...config.recommendedActions,
  {
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/prefer-readonly-parameter-types': 'off',
      'jest/no-restricted-jest-methods': 'off',
      'github-actions/ci-versions': 'off',
    },
  },
  {
    files: ['packages/e2e/**/*.ts'],
    rules: {
      '@cspell/spellchecker': 'off',
    },
  },
  {
    files: ['packages/integration/**/*.ts'],
    rules: {
      'sonarjs/no-identical-functions': 'off',
      'unicorn/no-global-object-property-assignment': 'off',
    },
  },
])
