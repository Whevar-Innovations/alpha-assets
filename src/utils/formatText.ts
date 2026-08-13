/**
 * Helper to process strings from CMS:
 * Converts escaped literal '\n' characters into real newline characters.
 */
export function formatCMSLines(text?: string): string {
  if (!text) return '';
  return text.replace(/\\n/g, '\n');
}
