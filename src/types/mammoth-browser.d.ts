declare module 'mammoth/mammoth.browser' {
	export function extractRawText(input: { arrayBuffer: ArrayBuffer }): Promise<{ value?: string }>;
	export function convertToHtml(input: { arrayBuffer: ArrayBuffer }): Promise<{ value?: string }>;

	const mammoth: {
		extractRawText: typeof extractRawText;
		convertToHtml: typeof convertToHtml;
	};

	export default mammoth;
}
