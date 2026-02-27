/**
 * Infer category from slug path.
 * e.g. "notes/api-discovery" -> "notes"
 */
export function inferCategoryFromSlug(slug: string): string {
  const parts = slug.split('/')
  if (parts.length > 1) {
    return parts[0]
  }
  return '根目录'
}
