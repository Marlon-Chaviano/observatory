/**
 * ESLint Configuration
 *
 * Comprehensive ESLint setup for Next.js App Router with TypeScript.
 * Designed for large teams with consistent code quality standards.
 *
 * Plugins:
 * - @next/core-web-vitals: Next.js best practices
 * - @next/typescript: TypeScript support
 * - eslint-plugin-simple-import-sort: Automatic import sorting
 * - eslint-plugin-react-hooks: React Hooks rules
 * - eslint-plugin-jsx-a11y: Accessibility rules
 * - eslint-config-prettier: Disable ESLint formatting rules (Prettier handles it)
 */

import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

const eslintConfig = defineConfig([
	// ============================================================================
	// Base Configurations
	// ============================================================================
	...nextVitals,
	...nextTs,
	prettierConfig, // Must be last to override formatting rules

	// ============================================================================
	// Global Ignores (replaces .eslintignore in ESLint 9)
	// ============================================================================
	globalIgnores([
		// Next.js build outputs
		".next/**",
		"out/**",
		"build/**",
		"dist/**",
		// TypeScript generated files
		"next-env.d.ts",
		"*.tsbuildinfo",
		// Dependencies
		"node_modules/**",
		".pnp",
		".pnp.js",
		// Testing
		"coverage/**",
		// Environment files
		".env*.local",
		// Cache
		".turbo/**",
		".vercel/**",
	]),

	// ============================================================================
	// TypeScript Files Configuration
	// ============================================================================
	{
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				ecmaFeatures: {
					jsx: true,
				},
				project: "./tsconfig.json",
			},
		},
		plugins: {
			"@typescript-eslint": typescriptEslint,
			"simple-import-sort": simpleImportSort,
			// Note: react-hooks and jsx-a11y are already included in eslint-config-next
			// Only add plugins that are not already included
		},
		rules: {
			// ====================================================================
			// TypeScript Rules
			// ====================================================================
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
			"@typescript-eslint/no-explicit-any": [
				"warn",
				{
					ignoreRestArgs: false,
				},
			],
			"@typescript-eslint/explicit-function-return-type": "off", // Too strict for React
			"@typescript-eslint/explicit-module-boundary-types": "off", // Too strict for React
			"@typescript-eslint/no-non-null-assertion": "warn",
			// Note: These rules require type information and may slow down linting
			// Uncomment if you need strict type checking
			// "@typescript-eslint/prefer-nullish-coalescing": "warn",
			// "@typescript-eslint/prefer-optional-chain": "warn",
			// "@typescript-eslint/no-unnecessary-condition": "warn",
			"@typescript-eslint/no-floating-promises": "error",
			"@typescript-eslint/await-thenable": "error",
			"@typescript-eslint/no-misused-promises": [
				"error",
				{
					checksVoidReturn: false, // Allow promises in useEffect
				},
			],

			// ====================================================================
			// Import Sorting (simple-import-sort)
			// ====================================================================
			"simple-import-sort/imports": [
				"error",
				{
					groups: [
						// Side effect imports
						["^\\u0000"],
						// React and Next.js
						["^react", "^next"],
						// External packages
						["^@?\\w"],
						// Internal packages (aliases starting with @/)
						["^@/"],
						// Parent imports
						["^\\.\\.(?!/?$)", "^\\.\\./?$"],
						// Same-folder imports
						["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
						// Style imports
						["^.+\\.s?css$"],
					],
				},
			],
			"simple-import-sort/exports": "error",

			// ====================================================================
			// React Hooks Rules
			// ====================================================================
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",

			// ====================================================================
			// Accessibility Rules (jsx-a11y)
			// ====================================================================
			"jsx-a11y/alt-text": [
				"error",
				{
					elements: ["img", "object", "area", "input[type=\"image\"]"],
					img: ["Image"],
					object: ["Object"],
					area: ["Area"],
					'input[type="image"]': ["InputImage"],
				},
			],
			"jsx-a11y/anchor-is-valid": [
				"error",
				{
					components: ["Link"],
					specialLink: ["hrefLeft", "hrefRight"],
					aspects: ["invalidHref", "preferButton"],
				},
			],
			"jsx-a11y/aria-props": "error",
			"jsx-a11y/aria-proptypes": "error",
			"jsx-a11y/aria-unsupported-elements": "error",
			"jsx-a11y/role-has-required-aria-props": "error",
			"jsx-a11y/role-supports-aria-props": "error",
			"jsx-a11y/click-events-have-key-events": "warn",
			"jsx-a11y/no-static-element-interactions": "warn",
			"jsx-a11y/no-noninteractive-element-interactions": "warn",

			// ====================================================================
			// General Code Quality Rules
			// ====================================================================
			"no-console": [
				"warn",
				{
					allow: ["warn", "error"],
				},
			],
			"no-debugger": "error",
			"no-duplicate-imports": "error",
			"no-unused-expressions": "off", // Use TypeScript version
			"@typescript-eslint/no-unused-expressions": [
				"error",
				{
					allowShortCircuit: true,
					allowTernary: true,
				},
			],
			"prefer-const": "error",
			"no-var": "error",
			"object-shorthand": "error",
			"prefer-arrow-callback": "error",
			"prefer-template": "error",

			// ====================================================================
			// Next.js Specific Rules
			// ====================================================================
			"@next/next/no-html-link-for-pages": "error",
			"@next/next/no-img-element": "warn", // Prefer next/image
			"@next/next/no-unwanted-polyfillio": "error",
			"@next/next/no-page-custom-font": "warn",
		},
	},

	// ============================================================================
	// JavaScript Files Configuration
	// ============================================================================
	{
		files: ["**/*.{js,jsx}"],
		plugins: {
			"simple-import-sort": simpleImportSort,
		},
		rules: {
			"no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
			"simple-import-sort/imports": [
				"error",
				{
					groups: [
						["^\\u0000"],
						["^react", "^next"],
						["^@?\\w"],
						["^@/"],
						["^\\.\\.(?!/?$)", "^\\.\\./?$"],
						["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
						["^.+\\.s?css$"],
					],
				},
			],
			"simple-import-sort/exports": "error",
		},
	},

	// ============================================================================
	// Configuration Files
	// ============================================================================
	{
		files: ["*.config.{js,mjs,cjs,ts}", ".eslintrc.{js,mjs,cjs}"],
		rules: {
			"@typescript-eslint/no-var-requires": "off", // Config files often use require
			"no-console": "off", // Config files may need console
		},
	},

	// ============================================================================
	// Test Files
	// ============================================================================
	{
		files: ["**/*.{test,spec}.{ts,tsx,js,jsx}", "**/__tests__/**"],
		rules: {
			"@typescript-eslint/no-explicit-any": "off", // Tests often need any
			"no-console": "off", // Tests may use console
		},
	},
]);

export default eslintConfig;
