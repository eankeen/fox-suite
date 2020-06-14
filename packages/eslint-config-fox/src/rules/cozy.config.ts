import { IFoxConfig } from 'fox-types';

const isProd = process.env.NODE_ENV === 'production';

/**
 * Enable cozy rules
 */
export function cozyConfig(fox: IFoxConfig, tier: string): Record<string, any> {
	const obj: Record<string, any> = {
		rules: {
			/* ------------------- possible errors ------------------ */
			'for-direction': 'off',
			'getter-return': 'off',
			'no-async-promise-executor': 'off',
			'no-await-in-loop': 'off',
			'no-compare-neg-zero': 'error',
			'no-cond-assign': ['error', 'except-parens'],
			'no-console': 'off',
			'no-constant-condition': 'off',
			'no-control-regex': 'error',
			'no-debugger': 'off',
			'no-dupe-args': 'error',
			'no-dupe-else-if': 'error',
			'no-dupe-keys': 'error',
			'no-duplicate-case': 'error',
			'no-empty-character-class': 'error',
			'no-empty': 'off',
			'no-ex-assign': 'error',
			'no-extra-boolean-cast': 'off',
			'no-extra-parens': [
				'off',
				'all',
				{
					conditionalAssign: true,
					returnAssign: true,
					nestedBinaryExpressions: true,
					ignoreJSX: 'all', // delegate to eslint-plugin-react
					enforceForArrowConditionals: false,
					enforceForSequenceExpressions: false,
					enforceForNewInMemberExpressions: false,
					enforceForFunctionPrototypeMethods: false,
				},
			],
			'no-extra-semi': 'error',
			'no-func-assign': 'error',
			'no-import-assign': 'error',
			'no-inner-declarations': 'error',
			'no-invalid-regexp': 'error',
			'no-irregular-whitespace': 'error',
			'no-loss-of-precision': 'error',
			'no-misleading-character-class': 'error',
			'no-obj-calls': 'error',
			'no-prototype-builtins': 'off',
			'no-regex-spaces': 'error',
			'no-setter-return': 'error',
			'no-sparse-arrays': 'off',
			'no-unexpected-multiline': 'error',
			'no-unreachable': 'error',
			'no-unsafe-finally': 'error',
			'no-unsafe-negation': 'error',
			'no-useless-backreference': 'off',
			'require-atomic-updates': 'error',
			'template-curly-spacing': ['error', 'never'],
			'use-isnan': 'error',
			'valid-typeof': ['error', { requireStringLiterals: true }],

			/* ------------------- best practices ------------------- */
			'accessor-pairs': 'off',
			'array-callback-return': 'off',
			'block-scoped-var': 'off',
			'class-methods-use-this': 'off',
			'complexity': 'off',
			'consistent-return': 'off',
			'curly': 'off',
			'default-case-last': 'off',
			'default-case': 'off',
			'default-param-last': 'off',
			'dot-location': ['error', 'property'],
			'dot-notation': 'off',
			'eqeqeq': ['error', 'always', { null: 'ignore' }],
			'grouped-accessor-pairs': 'off',
			'guard-for-in': 'off',
			'max-classes-per-file': 'off',
			'no-alert': 'off',
			'no-caller': 'off',
			'no-case-declarations': 'off',
			'no-constructor-return': 'error',
			'no-div-regex': 'error',
			'no-else-return': 'off',
			'no-empty-function': 'off',
			'no-empty-pattern': 'off',
			'no-eq-null': 'error',
			'no-eval': 'off',
			'no-extend-native': 'off',
			'no-extra-bind': 'off',
			'no-extra-label': 'off',
			'no-fallthrough': 'off',
			'no-floating-decimal': 'error',
			'no-global-assign': 'error',
			'no-implicit-coercion': 'off',
			'no-implicit-globals': 'off',
			'no-implied-eval': 'error',
			'no-invalid-this': 'error',
			'no-iterator': 'error',
			'no-labels': 'error',
			'no-lone-blocks': 'off',
			'no-loop-func': 'error',
			'no-magic-numbers': 'off',
			'no-multi-spaces': 'off',
			'no-multi-str': 'off',
			'no-new-func': 'off',
			'no-new-wrappers': 'off',
			'no-new': 'off',
			'no-octal-escape': 'error',
			'no-octal': 'error',
			'no-param-reassign': 'off',
			'no-proto': 'error',
			'no-redeclare': 'error',
			'no-restricted-properties': 'off',
			'no-return-assign': ['error', 'except-parens'],
			'no-return-await': 'off',
			'no-script-url': 'off',
			'no-self-assign': 'off',
			'no-self-compare': 'off',
			'no-sequences': 'off',
			'no-throw-literal': 'error',
			'no-unmodified-loop-condition': 'off',
			'no-unused-expressions': 'off',
			'no-unused-labels': 'off',
			'no-useless-call': 'off',
			'no-useless-catch': 'off',
			'no-useless-concat': 'off',
			'no-useless-escape': 'off',
			'no-useless-return': 'off',
			'no-void': 'off',
			'no-warning-comments': 'off',
			'no-with': 'off',
			'prefer-named-capture-group': 'off',
			'prefer-promise-reject-errors': 'off',
			'prefer-regex-literals': 'off',
			'radix': 'off',
			'require-await': 'off',
			'require-unicode-regexp': 'error',
			'vars-on-top': 'off',
			'wrap-iffe': 'off',
			'yoda': 'off',

			/* --------------------- strict mode -------------------- */
			'strict': 'off',

			/* ---------------------- variables --------------------- */
			'init-declarations': 'off',
			'no-delete-var': 'error',
			'no-label-var': 'off',
			'no-restricted-globals': 'off',
			'no-shadow-restricted-names': 'error',
			'no-shadow': 'off',
			'no-undef-init': 'off',
			'no-undef': 'error',
			'no-undefined': 'off',
			'no-unused-vars': 'off',
			'no-use-before-define': 'off',

			/* ------------------- stylistic issue ------------------ */
			'prefer-exponentiation-operator': 'off',

			/* -------------------- ecmascript 6 -------------------- */
			'arrow-body-style': 'off',
			'arrow-parens': 'off',
			'arrow-spacing': ['error', { before: true, after: true }],
			'constructor-super': 'error',
			'generator-star-spacing': ['error', { before: false, after: true }],
			'no-class-assign': 'error',
			'no-const-assign': 'error',
			'no-dupe-class-members': 'error',
			'no-duplicate-imports': 'off',
			'no-new-symbol': 'error',
			'no-restricted-exports': 'off',
			'no-restricted-imports': 'off',
			'no-this-before-super': 'off',
			'no-useless-computed-key': [
				'error',
				{ enforceForClassMembers: true },
			],
			'no-useless-constructor': 'off',
			'no-useless-rename': [
				'error',
				{
					ignoreDestructuring: false,
					ignoreImport: false,
					ignoreExport: false,
				},
			],
			'no-var': 'off',
			'object-shorthand': 'off',
			'prefer-arrow-callback': 'off',
			'prefer-const': 'off',
			'prefer-destructuring': 'off',
			'prefer-numeric-literals': 'off',
			'prefer-rest-params': 'off',
			'prefer-spread': 'off',
			'prefer-template': 'off',
			'require-yield': 'off',
			'rest-spread-spacing': ['error', 'never'],
			'sort-imports': 'error',
			'symbol-description': 'off',
			'yield-star-spacing': ['error', { before: false, after: true }],
		},
	};

	if (isProd) {
		/* ------------------- possible errors ------------------ */
		// these are duplicated in excessive.config.ts
		obj.rules['getter-return'] = 'error';
		obj.rules['no-unused-expressions'] = 'error';
		obj.rules['no-unused-labels'] = 'error';
	}

	return obj;
}
