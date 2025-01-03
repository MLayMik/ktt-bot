import antfu from '@antfu/eslint-config'

export default antfu({

  rules: {
    'max-len': ['error', { code: 80 }],
    'perfectionist/sort-imports': ['off'],
    'import/order': [
      'warn',
      { groups: ['builtin', 'external'], warnOnUnassignedImports: true },
    ],
    'unused-imports/no-unused-imports': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-redeclare': 'off',
  },
})
