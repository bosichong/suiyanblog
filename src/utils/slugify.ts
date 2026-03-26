/**
 * Convert a string to a URL-friendly slug
 * @param text - The text to slugify
 * @returns A lowercase, hyphenated slug
 */
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/[^\w\u4e00-\u9fa5\-]+/g, '') // Remove non-word, non-Chinese chars except hyphens
		.replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
		.replace(/^-+/, '') // Trim hyphens from start
		.replace(/-+$/, '') // Trim hyphens from end
		.replace(/[^\w\u4e00-\u9fa5\-]/g, (char) => encodeURIComponent(char)); // Encode remaining special chars
}
