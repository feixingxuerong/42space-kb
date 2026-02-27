/**
 * Navigation configuration - placeholder for 42space-kb
 * Can be extended to read from index.md in the future
 */

export interface IndexChapter {
  name: string
  status: string
}

export function getIndexChapters(): IndexChapter[] {
  // Return empty for now - can be extended to parse index.md
  return []
}
