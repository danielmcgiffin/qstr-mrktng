type UsageLike = {
	input_tokens?: number;
	output_tokens?: number;
	cache_creation_input_tokens?: number;
	cache_read_input_tokens?: number;
};

const MODEL_PRICING_USD_PER_MTOK = {
	input: 0.8,
	output: 4.0,
	cache_write: 1.0,
	cache_read: 0.08
} as const;

const INPUT_OVERHEAD_TOKENS_PER_CALL = 2600;
const DEFAULT_OUTPUT_TOKENS_PER_CALL = 1200;
const DEFAULT_EXPECTED_CALLS = 4;

export type ProjectedCostEstimate = {
	expected_calls: number;
	estimated_input_tokens: number;
	estimated_output_tokens: number;
	total_usd: number;
};

export type ActualCostEstimate = {
	input_tokens: number;
	output_tokens: number;
	cache_write_tokens: number;
	cache_read_tokens: number;
	total_usd: number;
};

export const estimateTokensFromText = (text: string): number =>
	Math.max(1, Math.ceil(text.length / 4));

export const estimateSubmissionCostUsd = (
	text: string,
	options: {
		expectedCalls?: number;
		inputOverheadTokensPerCall?: number;
		expectedOutputTokensPerCall?: number;
	} = {}
): ProjectedCostEstimate => {
	const expectedCalls = options.expectedCalls ?? DEFAULT_EXPECTED_CALLS;
	const inputOverheadTokensPerCall =
		options.inputOverheadTokensPerCall ?? INPUT_OVERHEAD_TOKENS_PER_CALL;
	const expectedOutputTokensPerCall =
		options.expectedOutputTokensPerCall ?? DEFAULT_OUTPUT_TOKENS_PER_CALL;
	const contentTokens = estimateTokensFromText(text);
	const estimatedInputTokens = expectedCalls * (contentTokens + inputOverheadTokensPerCall);
	const estimatedOutputTokens = expectedCalls * expectedOutputTokensPerCall;

	const totalUsd =
		(estimatedInputTokens / 1_000_000) * MODEL_PRICING_USD_PER_MTOK.input +
		(estimatedOutputTokens / 1_000_000) * MODEL_PRICING_USD_PER_MTOK.output;

	return {
		expected_calls: expectedCalls,
		estimated_input_tokens: estimatedInputTokens,
		estimated_output_tokens: estimatedOutputTokens,
		total_usd: totalUsd
	};
};

export const calculateActualCostUsd = (
	artifacts: Array<{ usage?: UsageLike | null }>
): ActualCostEstimate => {
	let inputTokens = 0;
	let outputTokens = 0;
	let cacheWriteTokens = 0;
	let cacheReadTokens = 0;

	for (const artifact of artifacts) {
		const usage = artifact.usage;
		if (!usage) continue;
		inputTokens += usage.input_tokens ?? 0;
		outputTokens += usage.output_tokens ?? 0;
		cacheWriteTokens += usage.cache_creation_input_tokens ?? 0;
		cacheReadTokens += usage.cache_read_input_tokens ?? 0;
	}

	const totalUsd =
		(inputTokens / 1_000_000) * MODEL_PRICING_USD_PER_MTOK.input +
		(outputTokens / 1_000_000) * MODEL_PRICING_USD_PER_MTOK.output +
		(cacheWriteTokens / 1_000_000) * MODEL_PRICING_USD_PER_MTOK.cache_write +
		(cacheReadTokens / 1_000_000) * MODEL_PRICING_USD_PER_MTOK.cache_read;

	return {
		input_tokens: inputTokens,
		output_tokens: outputTokens,
		cache_write_tokens: cacheWriteTokens,
		cache_read_tokens: cacheReadTokens,
		total_usd: totalUsd
	};
};

export const formatUsd = (value: number): string => `$${value.toFixed(3)}`;
