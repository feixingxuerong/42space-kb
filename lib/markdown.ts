/**
 * Extract title from markdown content (first # heading).
 */
export function extractTitleFromMarkdown(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m)
  if (match) {
    return match[1].trim()
  }
  return null
}
