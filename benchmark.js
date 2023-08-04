'use strict';

const { resolve } = require('path');
const { readdirSync, opendirSync } = require('fs');
const configFile = require('../eslint/eslint.config.js');
const { FlatConfigArray: OrigFlatConfigArray } = require('./node_modules/eslint/lib/config/flat-config-array.js');
const { FlatConfigArray } = require('../eslint/lib/config/flat-config-array.js');
const Benchmarkify = require('benchmarkify');

const files = `../eslint/.eslintrc.js
../eslint/eslint.config.js
../eslint/karma.conf.js
../eslint/Makefile.js
../eslint/webpack.config.js
../eslint/bin/eslint.js
../eslint/conf/config-schema.js
../eslint/conf/default-cli-options.js
../eslint/conf/globals.js
../eslint/docs/.eleventy.js
../eslint/docs/postcss.config.js
../eslint/lib/api.js
../eslint/lib/cli.js
../eslint/lib/options.js
../eslint/lib/unsupported-api.js
../eslint/messages/all-files-ignored.js
../eslint/messages/extend-config-missing.js
../eslint/messages/failed-to-read-json.js
../eslint/messages/file-not-found.js
../eslint/messages/invalid-rule-options.js
../eslint/messages/invalid-rule-severity.js
../eslint/messages/no-config-found.js
../eslint/messages/plugin-conflict.js
../eslint/messages/plugin-invalid.js
../eslint/messages/plugin-missing.js
../eslint/messages/print-config-with-directory-path.js
../eslint/messages/shared.js
../eslint/messages/whitespace-found.js
../eslint/tools/code-sample-minimizer.js
../eslint/tools/config-rule.js
../eslint/tools/eslint-fuzzer.js
../eslint/tools/fetch-docs-links.js
../eslint/tools/fuzzer-runner.js
../eslint/tools/update-eslint-all.js
../eslint/tools/update-readme.js
../eslint/tools/update-rule-types.js
../eslint/docs/tools/validate-links.js
../eslint/lib/cli-engine/cli-engine.js
../eslint/lib/cli-engine/file-enumerator.js
../eslint/lib/cli-engine/hash.js
../eslint/lib/cli-engine/index.js
../eslint/lib/cli-engine/lint-result-cache.js
../eslint/lib/cli-engine/load-rules.js
../eslint/lib/cli-engine/xml-escape.js
../eslint/lib/config/default-config.js
../eslint/lib/config/flat-config-array.js
../eslint/lib/config/flat-config-helpers.js
../eslint/lib/config/flat-config-schema.js
../eslint/lib/config/rule-validator.js
../eslint/lib/eslint/eslint-helpers.js
../eslint/lib/eslint/eslint.js
../eslint/lib/eslint/flat-eslint.js
../eslint/lib/eslint/index.js
../eslint/lib/linter/apply-disable-directives.js
../eslint/lib/linter/config-comment-parser.js
../eslint/lib/linter/index.js
../eslint/lib/linter/interpolate.js
../eslint/lib/linter/linter.js
../eslint/lib/linter/node-event-generator.js
../eslint/lib/linter/report-translator.js
../eslint/lib/linter/rule-fixer.js
../eslint/lib/linter/rules.js
../eslint/lib/linter/safe-emitter.js
../eslint/lib/linter/source-code-fixer.js
../eslint/lib/linter/timing.js
../eslint/lib/shared/ajv.js
../eslint/lib/shared/ast-utils.js
../eslint/lib/shared/config-validator.js
../eslint/lib/shared/deprecation-warnings.js
../eslint/lib/shared/directives.js
../eslint/lib/shared/logging.js
../eslint/lib/shared/relative-module-resolver.js
../eslint/lib/shared/runtime-info.js
../eslint/lib/shared/string-utils.js
../eslint/lib/shared/traverser.js
../eslint/lib/shared/types.js
../eslint/lib/source-code/index.js
../eslint/lib/source-code/source-code.js
../eslint/lib/rule-tester/flat-rule-tester.js
../eslint/lib/rule-tester/index.js
../eslint/lib/rule-tester/rule-tester.js
../eslint/lib/rules/accessor-pairs.js
../eslint/lib/rules/array-bracket-newline.js
../eslint/lib/rules/array-bracket-spacing.js
../eslint/lib/rules/array-callback-return.js
../eslint/lib/rules/array-element-newline.js
../eslint/lib/rules/arrow-body-style.js
../eslint/lib/rules/arrow-parens.js
../eslint/lib/rules/arrow-spacing.js
../eslint/lib/rules/block-scoped-var.js
../eslint/lib/rules/block-spacing.js
../eslint/lib/rules/brace-style.js
../eslint/lib/rules/callback-return.js
../eslint/lib/rules/camelcase.js
../eslint/lib/rules/capitalized-comments.js
../eslint/lib/rules/class-methods-use-this.js
../eslint/lib/rules/comma-dangle.js
../eslint/lib/rules/comma-spacing.js
../eslint/lib/rules/comma-style.js
../eslint/lib/rules/complexity.js
../eslint/lib/rules/computed-property-spacing.js
../eslint/lib/rules/consistent-return.js
../eslint/lib/rules/consistent-this.js
../eslint/lib/rules/constructor-super.js
../eslint/lib/rules/curly.js
../eslint/lib/rules/default-case-last.js
../eslint/lib/rules/default-case.js
../eslint/lib/rules/default-param-last.js
../eslint/lib/rules/dot-location.js
../eslint/lib/rules/dot-notation.js
../eslint/lib/rules/eol-last.js
../eslint/lib/rules/eqeqeq.js
../eslint/lib/rules/for-direction.js
../eslint/lib/rules/func-call-spacing.js
../eslint/lib/rules/func-name-matching.js
../eslint/lib/rules/func-names.js
../eslint/lib/rules/func-style.js
../eslint/lib/rules/function-call-argument-newline.js
../eslint/lib/rules/function-paren-newline.js
../eslint/lib/rules/generator-star-spacing.js
../eslint/lib/rules/getter-return.js
../eslint/lib/rules/global-require.js
../eslint/lib/rules/grouped-accessor-pairs.js
../eslint/lib/rules/guard-for-in.js
../eslint/lib/rules/handle-callback-err.js
../eslint/lib/rules/id-blacklist.js
../eslint/lib/rules/id-denylist.js
../eslint/lib/rules/id-length.js
../eslint/lib/rules/id-match.js
../eslint/lib/rules/implicit-arrow-linebreak.js
../eslint/lib/rules/indent-legacy.js
../eslint/lib/rules/indent.js
../eslint/lib/rules/index.js
../eslint/lib/rules/init-declarations.js
../eslint/lib/rules/jsx-quotes.js
../eslint/lib/rules/key-spacing.js
../eslint/lib/rules/keyword-spacing.js
../eslint/lib/rules/line-comment-position.js
../eslint/lib/rules/linebreak-style.js
../eslint/lib/rules/lines-around-comment.js
../eslint/lib/rules/lines-around-directive.js
../eslint/lib/rules/lines-between-class-members.js
../eslint/lib/rules/logical-assignment-operators.js
../eslint/lib/rules/max-classes-per-file.js
../eslint/lib/rules/max-depth.js
../eslint/lib/rules/max-len.js
../eslint/lib/rules/max-lines-per-function.js
../eslint/lib/rules/max-lines.js
../eslint/lib/rules/max-nested-callbacks.js
../eslint/lib/rules/max-params.js
../eslint/lib/rules/max-statements-per-line.js
../eslint/lib/rules/max-statements.js
../eslint/lib/rules/multiline-comment-style.js
../eslint/lib/rules/multiline-ternary.js
../eslint/lib/rules/new-cap.js
../eslint/lib/rules/new-parens.js
../eslint/lib/rules/newline-after-var.js
../eslint/lib/rules/newline-before-return.js
../eslint/lib/rules/newline-per-chained-call.js
../eslint/lib/rules/no-alert.js
../eslint/lib/rules/no-array-constructor.js
../eslint/lib/rules/no-async-promise-executor.js
../eslint/lib/rules/no-await-in-loop.js
../eslint/lib/rules/no-bitwise.js
../eslint/lib/rules/no-buffer-constructor.js
../eslint/lib/rules/no-caller.js
../eslint/lib/rules/no-case-declarations.js
../eslint/lib/rules/no-catch-shadow.js
../eslint/lib/rules/no-class-assign.js
../eslint/lib/rules/no-compare-neg-zero.js
../eslint/lib/rules/no-cond-assign.js
../eslint/lib/rules/no-confusing-arrow.js
../eslint/lib/rules/no-console.js
../eslint/lib/rules/no-const-assign.js
../eslint/lib/rules/no-constant-binary-expression.js
../eslint/lib/rules/no-constant-condition.js
../eslint/lib/rules/no-constructor-return.js
../eslint/lib/rules/no-continue.js
../eslint/lib/rules/no-control-regex.js
../eslint/lib/rules/no-debugger.js
../eslint/lib/rules/no-delete-var.js
../eslint/lib/rules/no-div-regex.js
../eslint/lib/rules/no-dupe-args.js
../eslint/lib/rules/no-dupe-class-members.js
../eslint/lib/rules/no-dupe-else-if.js
../eslint/lib/rules/no-dupe-keys.js
../eslint/lib/rules/no-duplicate-case.js
../eslint/lib/rules/no-duplicate-imports.js
../eslint/lib/rules/no-else-return.js
../eslint/lib/rules/no-empty-character-class.js
../eslint/lib/rules/no-empty-function.js
../eslint/lib/rules/no-empty-pattern.js
../eslint/lib/rules/no-empty-static-block.js
../eslint/lib/rules/no-empty.js
../eslint/lib/rules/no-eq-null.js
../eslint/lib/rules/no-eval.js
../eslint/lib/rules/no-ex-assign.js
../eslint/lib/rules/no-extend-native.js
../eslint/lib/rules/no-extra-bind.js
../eslint/lib/rules/no-extra-boolean-cast.js
../eslint/lib/rules/no-extra-label.js
../eslint/lib/rules/no-extra-parens.js
../eslint/lib/rules/no-extra-semi.js
../eslint/lib/rules/no-fallthrough.js
../eslint/lib/rules/no-floating-decimal.js
../eslint/lib/rules/no-func-assign.js
../eslint/lib/rules/no-global-assign.js
../eslint/lib/rules/no-implicit-coercion.js
../eslint/lib/rules/no-implicit-globals.js
../eslint/lib/rules/no-implied-eval.js
../eslint/lib/rules/no-import-assign.js
../eslint/lib/rules/no-inline-comments.js
../eslint/lib/rules/no-inner-declarations.js
../eslint/lib/rules/no-invalid-regexp.js
../eslint/lib/rules/no-invalid-this.js
../eslint/lib/rules/no-irregular-whitespace.js
../eslint/lib/rules/no-iterator.js
../eslint/lib/rules/no-label-var.js
../eslint/lib/rules/no-labels.js
../eslint/lib/rules/no-lone-blocks.js
../eslint/lib/rules/no-lonely-if.js
../eslint/lib/rules/no-loop-func.js
../eslint/lib/rules/no-loss-of-precision.js
../eslint/lib/rules/no-magic-numbers.js
../eslint/lib/rules/no-misleading-character-class.js
../eslint/lib/rules/no-mixed-operators.js
../eslint/lib/rules/no-mixed-requires.js
../eslint/lib/rules/no-mixed-spaces-and-tabs.js
../eslint/lib/rules/no-multi-assign.js
../eslint/lib/rules/no-multi-spaces.js
../eslint/lib/rules/no-multi-str.js
../eslint/lib/rules/no-multiple-empty-lines.js
../eslint/lib/rules/no-native-reassign.js
../eslint/lib/rules/no-negated-condition.js
../eslint/lib/rules/no-negated-in-lhs.js
../eslint/lib/rules/no-nested-ternary.js
../eslint/lib/rules/no-new-func.js
../eslint/lib/rules/no-new-native-nonconstructor.js
../eslint/lib/rules/no-new-object.js
../eslint/lib/rules/no-new-require.js
../eslint/lib/rules/no-new-symbol.js
../eslint/lib/rules/no-new-wrappers.js
../eslint/lib/rules/no-new.js
../eslint/lib/rules/no-nonoctal-decimal-escape.js
../eslint/lib/rules/no-obj-calls.js
../eslint/lib/rules/no-octal-escape.js
../eslint/lib/rules/no-octal.js
../eslint/lib/rules/no-param-reassign.js
../eslint/lib/rules/no-path-concat.js
../eslint/lib/rules/no-plusplus.js
../eslint/lib/rules/no-process-env.js
../eslint/lib/rules/no-process-exit.js
../eslint/lib/rules/no-promise-executor-return.js
../eslint/lib/rules/no-proto.js
../eslint/lib/rules/no-prototype-builtins.js
../eslint/lib/rules/no-redeclare.js
../eslint/lib/rules/no-regex-spaces.js
../eslint/lib/rules/no-restricted-exports.js
../eslint/lib/rules/no-restricted-globals.js
../eslint/lib/rules/no-restricted-imports.js
../eslint/lib/rules/no-restricted-modules.js
../eslint/lib/rules/no-restricted-properties.js
../eslint/lib/rules/no-restricted-syntax.js
../eslint/lib/rules/no-return-assign.js
../eslint/lib/rules/no-return-await.js
../eslint/lib/rules/no-script-url.js
../eslint/lib/rules/no-self-assign.js
../eslint/lib/rules/no-self-compare.js
../eslint/lib/rules/no-sequences.js
../eslint/lib/rules/no-setter-return.js
../eslint/lib/rules/no-shadow-restricted-names.js
../eslint/lib/rules/no-shadow.js
../eslint/lib/rules/no-spaced-func.js
../eslint/lib/rules/no-sparse-arrays.js
../eslint/lib/rules/no-sync.js
../eslint/lib/rules/no-tabs.js
../eslint/lib/rules/no-template-curly-in-string.js
../eslint/lib/rules/no-ternary.js
../eslint/lib/rules/no-this-before-super.js
../eslint/lib/rules/no-throw-literal.js
../eslint/lib/rules/no-trailing-spaces.js
../eslint/lib/rules/no-undef-init.js
../eslint/lib/rules/no-undef.js
../eslint/lib/rules/no-undefined.js
../eslint/lib/rules/no-underscore-dangle.js
../eslint/lib/rules/no-unexpected-multiline.js
../eslint/lib/rules/no-unmodified-loop-condition.js
../eslint/lib/rules/no-unneeded-ternary.js
../eslint/lib/rules/no-unreachable-loop.js
../eslint/lib/rules/no-unreachable.js
../eslint/lib/rules/no-unsafe-finally.js
../eslint/lib/rules/no-unsafe-negation.js
../eslint/lib/rules/no-unsafe-optional-chaining.js
../eslint/lib/rules/no-unused-expressions.js
../eslint/lib/rules/no-unused-labels.js
../eslint/lib/rules/no-unused-private-class-members.js
../eslint/lib/rules/no-unused-vars.js
../eslint/lib/rules/no-use-before-define.js
../eslint/lib/rules/no-useless-backreference.js
../eslint/lib/rules/no-useless-call.js
../eslint/lib/rules/no-useless-catch.js
../eslint/lib/rules/no-useless-computed-key.js
../eslint/lib/rules/no-useless-concat.js
../eslint/lib/rules/no-useless-constructor.js
../eslint/lib/rules/no-useless-escape.js
../eslint/lib/rules/no-useless-rename.js
../eslint/lib/rules/no-useless-return.js
../eslint/lib/rules/no-var.js
../eslint/lib/rules/no-void.js
../eslint/lib/rules/no-warning-comments.js
../eslint/lib/rules/no-whitespace-before-property.js
../eslint/lib/rules/no-with.js
../eslint/lib/rules/nonblock-statement-body-position.js
../eslint/lib/rules/object-curly-newline.js
../eslint/lib/rules/object-curly-spacing.js
../eslint/lib/rules/object-property-newline.js
../eslint/lib/rules/object-shorthand.js
../eslint/lib/rules/one-var-declaration-per-line.js
../eslint/lib/rules/one-var.js
../eslint/lib/rules/operator-assignment.js
../eslint/lib/rules/operator-linebreak.js
../eslint/lib/rules/padded-blocks.js
../eslint/lib/rules/padding-line-between-statements.js
../eslint/lib/rules/prefer-arrow-callback.js
../eslint/lib/rules/prefer-const.js
../eslint/lib/rules/prefer-destructuring.js
../eslint/lib/rules/prefer-exponentiation-operator.js
../eslint/lib/rules/prefer-named-capture-group.js
../eslint/lib/rules/prefer-numeric-literals.js
../eslint/lib/rules/prefer-object-has-own.js
../eslint/lib/rules/prefer-object-spread.js
../eslint/lib/rules/prefer-promise-reject-errors.js
../eslint/lib/rules/prefer-reflect.js
../eslint/lib/rules/prefer-regex-literals.js
../eslint/lib/rules/prefer-rest-params.js
../eslint/lib/rules/prefer-spread.js
../eslint/lib/rules/prefer-template.js
../eslint/lib/rules/quote-props.js
../eslint/lib/rules/quotes.js
../eslint/lib/rules/radix.js
../eslint/lib/rules/require-atomic-updates.js
../eslint/lib/rules/require-await.js
../eslint/lib/rules/require-jsdoc.js
../eslint/lib/rules/require-unicode-regexp.js
../eslint/lib/rules/require-yield.js
../eslint/lib/rules/rest-spread-spacing.js
../eslint/lib/rules/semi-spacing.js
../eslint/lib/rules/semi-style.js
../eslint/lib/rules/semi.js
../eslint/lib/rules/sort-imports.js
../eslint/lib/rules/sort-keys.js
../eslint/lib/rules/sort-vars.js
../eslint/lib/rules/space-before-blocks.js
../eslint/lib/rules/space-before-function-paren.js
../eslint/lib/rules/space-in-parens.js
../eslint/lib/rules/space-infix-ops.js
../eslint/lib/rules/space-unary-ops.js
../eslint/lib/rules/spaced-comment.js
../eslint/lib/rules/strict.js
../eslint/lib/rules/switch-colon-spacing.js
../eslint/lib/rules/symbol-description.js
../eslint/lib/rules/template-curly-spacing.js
../eslint/lib/rules/template-tag-spacing.js
../eslint/lib/rules/unicode-bom.js
../eslint/lib/rules/use-isnan.js
../eslint/lib/rules/valid-jsdoc.js
../eslint/lib/rules/valid-typeof.js
../eslint/lib/rules/vars-on-top.js
../eslint/lib/rules/wrap-iife.js
../eslint/lib/rules/wrap-regex.js
../eslint/lib/rules/yield-star-spacing.js
../eslint/lib/rules/yoda.js
../eslint/packages/eslint-config-eslint/base.js
../eslint/packages/eslint-config-eslint/cjs.js
../eslint/packages/eslint-config-eslint/eslintrc.js
../eslint/packages/eslint-config-eslint/index.js
../eslint/packages/eslint-config-eslint/nodejs.js
../eslint/tests/bin/eslint.js
../eslint/tests/lib/api.js
../eslint/tests/lib/cli.js
../eslint/tests/lib/options.js
../eslint/tests/lib/unsupported-api.js
../eslint/tests/conf/config-schema.js
../eslint/tests/conf/eslint-all.js
../eslint/tests/conf/eslint-recommended.js
../eslint/tests/_utils/in-memory-fs.js
../eslint/tests/_utils/index.js
../eslint/tests/_utils/test-lazy-loading-rules.js
../eslint/tests/tools/code-sample-minimizer.js
../eslint/tests/tools/config-rule.js
../eslint/tests/tools/eslint-fuzzer.js
../eslint/tools/internal-testers/event-generator-tester.js
../eslint/tools/internal-testers/test-parser.js
../eslint/tools/internal-rules/index.js
../eslint/tools/internal-rules/multiline-comment-style.js
../eslint/tools/internal-rules/no-invalid-meta.js
../eslint/lib/cli-engine/formatters/checkstyle.js
../eslint/lib/cli-engine/formatters/compact.js
../eslint/lib/cli-engine/formatters/html.js
../eslint/lib/cli-engine/formatters/jslint-xml.js
../eslint/lib/cli-engine/formatters/json-with-metadata.js
../eslint/lib/cli-engine/formatters/json.js
../eslint/lib/cli-engine/formatters/junit.js
../eslint/lib/cli-engine/formatters/stylish.js
../eslint/lib/cli-engine/formatters/tap.js
../eslint/lib/cli-engine/formatters/unix.js
../eslint/lib/cli-engine/formatters/visualstudio.js
../eslint/lib/linter/code-path-analysis/code-path-analyzer.js
../eslint/lib/linter/code-path-analysis/code-path-segment.js
../eslint/lib/linter/code-path-analysis/code-path-state.js
../eslint/lib/linter/code-path-analysis/code-path.js
../eslint/lib/linter/code-path-analysis/debug-helpers.js
../eslint/lib/linter/code-path-analysis/fork-context.js
../eslint/lib/linter/code-path-analysis/id-generator.js
../eslint/lib/source-code/token-store/backward-token-comment-cursor.js
../eslint/lib/source-code/token-store/backward-token-cursor.js
../eslint/lib/source-code/token-store/cursor.js
../eslint/lib/source-code/token-store/cursors.js
../eslint/lib/source-code/token-store/decorative-cursor.js
../eslint/lib/source-code/token-store/filter-cursor.js
../eslint/lib/source-code/token-store/forward-token-comment-cursor.js
../eslint/lib/source-code/token-store/forward-token-cursor.js
../eslint/lib/source-code/token-store/index.js
../eslint/lib/source-code/token-store/limit-cursor.js
../eslint/lib/source-code/token-store/padded-token-cursor.js
../eslint/lib/source-code/token-store/skip-cursor.js
../eslint/lib/source-code/token-store/utils.js
../eslint/lib/rules/utils/ast-utils.js
../eslint/lib/rules/utils/fix-tracker.js
../eslint/lib/rules/utils/keywords.js
../eslint/lib/rules/utils/lazy-loading-rule-map.js
../eslint/lib/rules/utils/regular-expressions.js
../eslint/packages/js/src/index.js
../eslint/tests/lib/cli-engine/cli-engine.js
../eslint/tests/lib/cli-engine/file-enumerator.js
../eslint/tests/lib/cli-engine/lint-result-cache.js
../eslint/tests/lib/cli-engine/load-rules.js
../eslint/tests/lib/config/flat-config-array.js
../eslint/tests/lib/config/flat-config-helpers.js
../eslint/tests/lib/linter/apply-disable-directives.js
../eslint/tests/lib/linter/config-comment-parser.js
../eslint/tests/lib/linter/interpolate.js
../eslint/tests/lib/linter/linter.js
../eslint/tests/lib/linter/node-event-generator.js
../eslint/tests/lib/linter/report-translator.js
../eslint/tests/lib/linter/rule-fixer.js
../eslint/tests/lib/linter/rules.js
../eslint/tests/lib/linter/safe-emitter.js
../eslint/tests/lib/linter/source-code-fixer.js
../eslint/tests/lib/linter/timing.js
../eslint/tests/lib/rule-tester/flat-rule-tester.js
../eslint/tests/lib/rule-tester/no-test-runners.js
../eslint/tests/lib/rule-tester/rule-tester.js
../eslint/tests/lib/shared/config-validator.js
../eslint/tests/lib/shared/runtime-info.js
../eslint/tests/lib/shared/string-utils.js
../eslint/tests/lib/shared/traverser.js
../eslint/tests/lib/eslint/eslint.config.js
../eslint/tests/lib/eslint/eslint.js
../eslint/tests/lib/eslint/flat-eslint.js
../eslint/tests/lib/source-code/source-code.js
../eslint/tests/lib/source-code/token-store.js
../eslint/tests/lib/rules/accessor-pairs.js
../eslint/tests/lib/rules/array-bracket-newline.js
../eslint/tests/lib/rules/array-bracket-spacing.js
../eslint/tests/lib/rules/array-callback-return.js
../eslint/tests/lib/rules/array-element-newline.js
../eslint/tests/lib/rules/arrow-body-style.js
../eslint/tests/lib/rules/arrow-parens.js
../eslint/tests/lib/rules/arrow-spacing.js
../eslint/tests/lib/rules/block-scoped-var.js
../eslint/tests/lib/rules/block-spacing.js
../eslint/tests/lib/rules/brace-style.js
../eslint/tests/lib/rules/callback-return.js
../eslint/tests/lib/rules/camelcase.js
../eslint/tests/lib/rules/capitalized-comments.js
../eslint/tests/lib/rules/class-methods-use-this.js
../eslint/tests/lib/rules/comma-dangle.js
../eslint/tests/lib/rules/comma-spacing.js
../eslint/tests/lib/rules/comma-style.js
../eslint/tests/lib/rules/complexity.js
../eslint/tests/lib/rules/computed-property-spacing.js
../eslint/tests/lib/rules/consistent-return.js
../eslint/tests/lib/rules/consistent-this.js
../eslint/tests/lib/rules/constructor-super.js
../eslint/tests/lib/rules/curly.js
../eslint/tests/lib/rules/default-case-last.js
../eslint/tests/lib/rules/default-case.js
../eslint/tests/lib/rules/default-param-last.js
../eslint/tests/lib/rules/dot-location.js
../eslint/tests/lib/rules/dot-notation.js
../eslint/tests/lib/rules/eol-last.js
../eslint/tests/lib/rules/eqeqeq.js
../eslint/tests/lib/rules/for-direction.js
../eslint/tests/lib/rules/func-call-spacing.js
../eslint/tests/lib/rules/func-name-matching.js
../eslint/tests/lib/rules/func-names.js
../eslint/tests/lib/rules/func-style.js
../eslint/tests/lib/rules/function-call-argument-newline.js
../eslint/tests/lib/rules/function-paren-newline.js
../eslint/tests/lib/rules/generator-star-spacing.js
../eslint/tests/lib/rules/getter-return.js
../eslint/tests/lib/rules/global-require.js
../eslint/tests/lib/rules/grouped-accessor-pairs.js
../eslint/tests/lib/rules/guard-for-in.js
../eslint/tests/lib/rules/handle-callback-err.js
../eslint/tests/lib/rules/id-blacklist.js
../eslint/tests/lib/rules/id-denylist.js
../eslint/tests/lib/rules/id-length.js
../eslint/tests/lib/rules/id-match.js
../eslint/tests/lib/rules/implicit-arrow-linebreak.js
../eslint/tests/lib/rules/indent-legacy.js
../eslint/tests/lib/rules/indent.js
../eslint/tests/lib/rules/init-declarations.js
../eslint/tests/lib/rules/jsx-quotes.js
../eslint/tests/lib/rules/key-spacing.js
../eslint/tests/lib/rules/keyword-spacing.js
../eslint/tests/lib/rules/line-comment-position.js
../eslint/tests/lib/rules/linebreak-style.js
../eslint/tests/lib/rules/lines-around-comment.js
../eslint/tests/lib/rules/lines-around-directive.js
../eslint/tests/lib/rules/lines-between-class-members.js
../eslint/tests/lib/rules/logical-assignment-operators.js
../eslint/tests/lib/rules/max-classes-per-file.js
../eslint/tests/lib/rules/max-depth.js
../eslint/tests/lib/rules/max-len.js
../eslint/tests/lib/rules/max-lines-per-function.js
../eslint/tests/lib/rules/max-lines.js
../eslint/tests/lib/rules/max-nested-callbacks.js
../eslint/tests/lib/rules/max-params.js
../eslint/tests/lib/rules/max-statements-per-line.js
../eslint/tests/lib/rules/max-statements.js
../eslint/tests/lib/rules/multiline-comment-style.js
../eslint/tests/lib/rules/multiline-ternary.js
../eslint/tests/lib/rules/new-cap.js
../eslint/tests/lib/rules/new-parens.js
../eslint/tests/lib/rules/newline-after-var.js
../eslint/tests/lib/rules/newline-before-return.js
../eslint/tests/lib/rules/newline-per-chained-call.js
../eslint/tests/lib/rules/no-alert.js
../eslint/tests/lib/rules/no-array-constructor.js
../eslint/tests/lib/rules/no-async-promise-executor.js
../eslint/tests/lib/rules/no-await-in-loop.js
../eslint/tests/lib/rules/no-bitwise.js
../eslint/tests/lib/rules/no-buffer-constructor.js
../eslint/tests/lib/rules/no-caller.js
../eslint/tests/lib/rules/no-case-declarations.js
../eslint/tests/lib/rules/no-catch-shadow.js
../eslint/tests/lib/rules/no-class-assign.js
../eslint/tests/lib/rules/no-compare-neg-zero.js
../eslint/tests/lib/rules/no-cond-assign.js
../eslint/tests/lib/rules/no-confusing-arrow.js
../eslint/tests/lib/rules/no-console.js
../eslint/tests/lib/rules/no-const-assign.js
../eslint/tests/lib/rules/no-constant-binary-expression.js
../eslint/tests/lib/rules/no-constant-condition.js
../eslint/tests/lib/rules/no-constructor-return.js
../eslint/tests/lib/rules/no-continue.js
../eslint/tests/lib/rules/no-control-regex.js
../eslint/tests/lib/rules/no-debugger.js
../eslint/tests/lib/rules/no-delete-var.js
../eslint/tests/lib/rules/no-div-regex.js
../eslint/tests/lib/rules/no-dupe-args.js
../eslint/tests/lib/rules/no-dupe-class-members.js
../eslint/tests/lib/rules/no-dupe-else-if.js
../eslint/tests/lib/rules/no-dupe-keys.js
../eslint/tests/lib/rules/no-duplicate-case.js
../eslint/tests/lib/rules/no-duplicate-imports.js
../eslint/tests/lib/rules/no-else-return.js
../eslint/tests/lib/rules/no-empty-character-class.js
../eslint/tests/lib/rules/no-empty-function.js
../eslint/tests/lib/rules/no-empty-pattern.js
../eslint/tests/lib/rules/no-empty-static-block.js
../eslint/tests/lib/rules/no-empty.js
../eslint/tests/lib/rules/no-eq-null.js
../eslint/tests/lib/rules/no-eval.js
../eslint/tests/lib/rules/no-ex-assign.js
../eslint/tests/lib/rules/no-extend-native.js
../eslint/tests/lib/rules/no-extra-bind.js
../eslint/tests/lib/rules/no-extra-boolean-cast.js
../eslint/tests/lib/rules/no-extra-label.js
../eslint/tests/lib/rules/no-extra-parens.js
../eslint/tests/lib/rules/no-extra-semi.js
../eslint/tests/lib/rules/no-fallthrough.js
../eslint/tests/lib/rules/no-floating-decimal.js
../eslint/tests/lib/rules/no-func-assign.js
../eslint/tests/lib/rules/no-global-assign.js
../eslint/tests/lib/rules/no-implicit-coercion.js
../eslint/tests/lib/rules/no-implicit-globals.js
../eslint/tests/lib/rules/no-implied-eval.js
../eslint/tests/lib/rules/no-import-assign.js
../eslint/tests/lib/rules/no-inline-comments.js
../eslint/tests/lib/rules/no-inner-declarations.js
../eslint/tests/lib/rules/no-invalid-regexp.js
../eslint/tests/lib/rules/no-invalid-this.js
../eslint/tests/lib/rules/no-irregular-whitespace.js
../eslint/tests/lib/rules/no-iterator.js
../eslint/tests/lib/rules/no-label-var.js
../eslint/tests/lib/rules/no-labels.js
../eslint/tests/lib/rules/no-lone-blocks.js
../eslint/tests/lib/rules/no-lonely-if.js
../eslint/tests/lib/rules/no-loop-func.js
../eslint/tests/lib/rules/no-loss-of-precision.js
../eslint/tests/lib/rules/no-magic-numbers.js
../eslint/tests/lib/rules/no-misleading-character-class.js
../eslint/tests/lib/rules/no-mixed-operators.js
../eslint/tests/lib/rules/no-mixed-requires.js
../eslint/tests/lib/rules/no-mixed-spaces-and-tabs.js
../eslint/tests/lib/rules/no-multi-assign.js
../eslint/tests/lib/rules/no-multi-spaces.js
../eslint/tests/lib/rules/no-multi-str.js
../eslint/tests/lib/rules/no-multiple-empty-lines.js
../eslint/tests/lib/rules/no-native-reassign.js
../eslint/tests/lib/rules/no-negated-condition.js
../eslint/tests/lib/rules/no-negated-in-lhs.js
../eslint/tests/lib/rules/no-nested-ternary.js
../eslint/tests/lib/rules/no-new-func.js
../eslint/tests/lib/rules/no-new-native-nonconstructor.js
../eslint/tests/lib/rules/no-new-object.js
../eslint/tests/lib/rules/no-new-require.js
../eslint/tests/lib/rules/no-new-symbol.js
../eslint/tests/lib/rules/no-new-wrappers.js
../eslint/tests/lib/rules/no-new.js
../eslint/tests/lib/rules/no-nonoctal-decimal-escape.js
../eslint/tests/lib/rules/no-obj-calls.js
../eslint/tests/lib/rules/no-octal-escape.js
../eslint/tests/lib/rules/no-octal.js
../eslint/tests/lib/rules/no-param-reassign.js
../eslint/tests/lib/rules/no-path-concat.js
../eslint/tests/lib/rules/no-plusplus.js
../eslint/tests/lib/rules/no-process-env.js
../eslint/tests/lib/rules/no-process-exit.js
../eslint/tests/lib/rules/no-promise-executor-return.js
../eslint/tests/lib/rules/no-proto.js
../eslint/tests/lib/rules/no-prototype-builtins.js
../eslint/tests/lib/rules/no-redeclare.js
../eslint/tests/lib/rules/no-regex-spaces.js
../eslint/tests/lib/rules/no-restricted-exports.js
../eslint/tests/lib/rules/no-restricted-globals.js
../eslint/tests/lib/rules/no-restricted-imports.js
../eslint/tests/lib/rules/no-restricted-modules.js
../eslint/tests/lib/rules/no-restricted-properties.js
../eslint/tests/lib/rules/no-restricted-syntax.js
../eslint/tests/lib/rules/no-return-assign.js
../eslint/tests/lib/rules/no-return-await.js
../eslint/tests/lib/rules/no-script-url.js
../eslint/tests/lib/rules/no-self-assign.js
../eslint/tests/lib/rules/no-self-compare.js
../eslint/tests/lib/rules/no-sequences.js
../eslint/tests/lib/rules/no-setter-return.js
../eslint/tests/lib/rules/no-shadow-restricted-names.js
../eslint/tests/lib/rules/no-shadow.js
../eslint/tests/lib/rules/no-spaced-func.js
../eslint/tests/lib/rules/no-sparse-arrays.js
../eslint/tests/lib/rules/no-sync.js
../eslint/tests/lib/rules/no-tabs.js
../eslint/tests/lib/rules/no-template-curly-in-string.js
../eslint/tests/lib/rules/no-ternary.js
../eslint/tests/lib/rules/no-this-before-super.js
../eslint/tests/lib/rules/no-throw-literal.js
../eslint/tests/lib/rules/no-trailing-spaces.js
../eslint/tests/lib/rules/no-undef-init.js
../eslint/tests/lib/rules/no-undef.js
../eslint/tests/lib/rules/no-undefined.js
../eslint/tests/lib/rules/no-underscore-dangle.js
../eslint/tests/lib/rules/no-unexpected-multiline.js
../eslint/tests/lib/rules/no-unmodified-loop-condition.js
../eslint/tests/lib/rules/no-unneeded-ternary.js
../eslint/tests/lib/rules/no-unreachable-loop.js
../eslint/tests/lib/rules/no-unreachable.js
../eslint/tests/lib/rules/no-unsafe-finally.js
../eslint/tests/lib/rules/no-unsafe-negation.js
../eslint/tests/lib/rules/no-unsafe-optional-chaining.js
../eslint/tests/lib/rules/no-unused-expressions.js
../eslint/tests/lib/rules/no-unused-labels.js
../eslint/tests/lib/rules/no-unused-private-class-members.js
../eslint/tests/lib/rules/no-unused-vars.js
../eslint/tests/lib/rules/no-use-before-define.js
../eslint/tests/lib/rules/no-useless-backreference.js
../eslint/tests/lib/rules/no-useless-call.js
../eslint/tests/lib/rules/no-useless-catch.js
../eslint/tests/lib/rules/no-useless-computed-key.js
../eslint/tests/lib/rules/no-useless-concat.js
../eslint/tests/lib/rules/no-useless-constructor.js
../eslint/tests/lib/rules/no-useless-escape.js
../eslint/tests/lib/rules/no-useless-rename.js
../eslint/tests/lib/rules/no-useless-return.js
../eslint/tests/lib/rules/no-var.js
../eslint/tests/lib/rules/no-void.js
../eslint/tests/lib/rules/no-warning-comments.js
../eslint/tests/lib/rules/no-whitespace-before-property.js
../eslint/tests/lib/rules/no-with.js
../eslint/tests/lib/rules/nonblock-statement-body-position.js
../eslint/tests/lib/rules/object-curly-newline.js
../eslint/tests/lib/rules/object-curly-spacing.js
../eslint/tests/lib/rules/object-property-newline.js
../eslint/tests/lib/rules/object-shorthand.js
../eslint/tests/lib/rules/one-var-declaration-per-line.js
../eslint/tests/lib/rules/one-var.js
../eslint/tests/lib/rules/operator-assignment.js
../eslint/tests/lib/rules/operator-linebreak.js
../eslint/tests/lib/rules/padded-blocks.js
../eslint/tests/lib/rules/padding-line-between-statements.js
../eslint/tests/lib/rules/prefer-arrow-callback.js
../eslint/tests/lib/rules/prefer-const.js
../eslint/tests/lib/rules/prefer-destructuring.js
../eslint/tests/lib/rules/prefer-exponentiation-operator.js
../eslint/tests/lib/rules/prefer-named-capture-group.js
../eslint/tests/lib/rules/prefer-numeric-literals.js
../eslint/tests/lib/rules/prefer-object-has-own.js
../eslint/tests/lib/rules/prefer-object-spread.js
../eslint/tests/lib/rules/prefer-promise-reject-errors.js
../eslint/tests/lib/rules/prefer-reflect.js
../eslint/tests/lib/rules/prefer-regex-literals.js
../eslint/tests/lib/rules/prefer-rest-params.js
../eslint/tests/lib/rules/prefer-spread.js
../eslint/tests/lib/rules/prefer-template.js
../eslint/tests/lib/rules/quote-props.js
../eslint/tests/lib/rules/quotes.js
../eslint/tests/lib/rules/radix.js
../eslint/tests/lib/rules/require-atomic-updates.js
../eslint/tests/lib/rules/require-await.js
../eslint/tests/lib/rules/require-jsdoc.js
../eslint/tests/lib/rules/require-unicode-regexp.js
../eslint/tests/lib/rules/require-yield.js
../eslint/tests/lib/rules/rest-spread-spacing.js
../eslint/tests/lib/rules/semi-spacing.js
../eslint/tests/lib/rules/semi-style.js
../eslint/tests/lib/rules/semi.js
../eslint/tests/lib/rules/sort-imports.js
../eslint/tests/lib/rules/sort-keys.js
../eslint/tests/lib/rules/sort-vars.js
../eslint/tests/lib/rules/space-before-blocks.js
../eslint/tests/lib/rules/space-before-function-paren.js
../eslint/tests/lib/rules/space-in-parens.js
../eslint/tests/lib/rules/space-infix-ops.js
../eslint/tests/lib/rules/space-unary-ops.js
../eslint/tests/lib/rules/spaced-comment.js
../eslint/tests/lib/rules/strict.js
../eslint/tests/lib/rules/switch-colon-spacing.js
../eslint/tests/lib/rules/symbol-description.js
../eslint/tests/lib/rules/template-curly-spacing.js
../eslint/tests/lib/rules/template-tag-spacing.js
../eslint/tests/lib/rules/unicode-bom.js
../eslint/tests/lib/rules/use-isnan.js
../eslint/tests/lib/rules/valid-jsdoc.js
../eslint/tests/lib/rules/valid-typeof.js
../eslint/tests/lib/rules/vars-on-top.js
../eslint/tests/lib/rules/wrap-iife.js
../eslint/tests/lib/rules/wrap-regex.js
../eslint/tests/lib/rules/yield-star-spacing.js
../eslint/tests/lib/rules/yoda.js
../eslint/tests/tools/internal-rules/multiline-comment-style.js
../eslint/tests/tools/internal-rules/no-invalid-meta.js
../eslint/lib/rules/utils/patterns/letters.js
../eslint/lib/rules/utils/unicode/index.js
../eslint/lib/rules/utils/unicode/is-combining-character.js
../eslint/lib/rules/utils/unicode/is-emoji-modifier.js
../eslint/lib/rules/utils/unicode/is-regional-indicator-symbol.js
../eslint/lib/rules/utils/unicode/is-surrogate-pair.js
../eslint/packages/js/src/configs/eslint-all.js
../eslint/packages/js/src/configs/eslint-recommended.js
../eslint/tests/lib/cli-engine/formatters/checkstyle.js
../eslint/tests/lib/cli-engine/formatters/compact.js
../eslint/tests/lib/cli-engine/formatters/html.js
../eslint/tests/lib/cli-engine/formatters/jslint-xml.js
../eslint/tests/lib/cli-engine/formatters/json-with-metadata.js
../eslint/tests/lib/cli-engine/formatters/json.js
../eslint/tests/lib/cli-engine/formatters/junit.js
../eslint/tests/lib/cli-engine/formatters/stylish.js
../eslint/tests/lib/cli-engine/formatters/tap.js
../eslint/tests/lib/cli-engine/formatters/unix.js
../eslint/tests/lib/cli-engine/formatters/visualstudio.js
../eslint/tests/lib/linter/code-path-analysis/code-path-analyzer.js
../eslint/tests/lib/linter/code-path-analysis/code-path.js
../eslint/tests/lib/rules/utils/ast-utils.js
../eslint/tests/lib/rules/utils/fix-tracker.js`.split('\n').map(p => resolve(p));




function isDirectory(path) {
	let handle = undefined;
	try {
		handle = opendirSync(path);
		return true;
	} catch (error) {
		if (error instanceof Error && 'code' in error && (error.code === 'ENOENT' || error.code === 'ENOTDIR')) {
			return false;
		}

		throw error;
	} finally {
		handle?.closeSync();
	}
}

function* scanFilesRecursive(path) {
	for (const name of readdirSync(path)) {
		if (name === 'node_modules') {
			continue;
		}

		const fullPath = resolve(path, name);
		if (isDirectory(fullPath)) {
			yield* scanFilesRecursive(fullPath);
		} else {
			yield fullPath;
		}
	}
}

const allFiles = [...scanFilesRecursive('../eslint')];

const eslintPath = resolve('../eslint');

const benchmark = new Benchmarkify('Config optimizations').printHeader();

const options = {
	globalIgnores: [false, true],
	fileGlobs: [false, true],
	universalGlobs: [false, true],
};

const optimizationRuns = Object.entries(options).reduce((cartesianProduct, [key, values]) => {
	const newValues = [];
	for (const existingObject of cartesianProduct) {
		for (const value of values) {
			newValues.push({ ...existingObject, [key]: value });
		}
	}
	return newValues;
}, [{ mergeGlobals: true }]);

const bench1 = benchmark.createSuite('Files linted by eslint');

bench1.ref('ESLint', () => {
	const config = new OrigFlatConfigArray(configFile, { basePath: eslintPath });

	config.normalizeSync();

	for (const file of files) {
		config.getConfig(file);
	}
});

for(const run of optimizationRuns) {

	bench1.add(`mergeGlobals: true, globalIgnores: ${run.globalIgnores}, fileGlobs: ${run.fileGlobs}, universalGlobs: ${run.universalGlobs}`, () => {
		const config = new FlatConfigArray(configFile, { basePath: eslintPath, optimizations: run });

		config.normalizeSync();

		for (const file of files) {
			config.getConfig(file);
		}
	});
}

const bench2 = benchmark.createSuite('All files in eslint dir');

bench2.ref('ESLint', () => {
	const config = new OrigFlatConfigArray(configFile, { basePath: eslintPath });

	config.normalizeSync();

	for (const file of allFiles) {
		config.getConfig(file);
	}
});

for(const run of optimizationRuns) {

	bench2.add(`mergeGlobals: true, globalIgnores: ${run.globalIgnores}, fileGlobs: ${run.fileGlobs}, universalGlobs: ${run.universalGlobs}`, () => {
		const config = new FlatConfigArray(configFile, { basePath: eslintPath, optimizations: run });

		config.normalizeSync();

		for (const file of allFiles) {
			config.getConfig(file);
		}
	});
}

benchmark.run([bench1, bench2]);