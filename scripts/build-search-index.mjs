import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content/knowledge')
const outputDir = path.join(process.cwd(), 'public')

function getAllFiles(dir) {
  const files = []
  if (!fs.existsSync(dir)) return files
  
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...getAllFiles(fullPath))
    } else if (entry.name.match(/\.mdx?$/)) {
      files.push(fullPath)
    }
  }
  
  return files
}

function extractTitleFromMarkdown(content) {
  const match = content.match(/^#\s+(.+)$/m)
  if (match) {
    return match[1].trim()
  }
  return null
}

function inferCategoryFromSlug(slug) {
  const parts = slug.split('/')
  if (parts.length > 1) {
    return parts[0]
  }
  return '根目录'
}

function buildSearchIndex() {
  console.log('Building search index...')
  
  if (!fs.existsSync(contentDir)) {
    console.log('No content directory found, creating empty index')
    fs.writeFileSync(
      path.join(outputDir, 'search-index.json'),
      JSON.stringify({ generatedAt: new Date().toISOString(), docs: [] }, null, 2)
    )
    return
  }

  const files = getAllFiles(contentDir)
  const docs = files.map((file) => {
    const relativePath = path.relative(contentDir, file)
    const slug = relativePath.replace(/\.mdx?$/, '').replace(/\\/g, '/')
    const fileContent = fs.readFileSync(file, 'utf-8')
    const { data, content } = matter(fileContent)

    const title = (data.title) || extractTitleFromMarkdown(content) || slug
    const category = (data.category) || inferCategoryFromSlug(slug)
    const description = data.description

    // Strip markdown for search text
    const text = content
      .replace(/^#+\s+.+$/gm, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/[*_`~]/g, '')
      .replace(/\n+/g, ' ')
      .trim()

    return {
      slug,
      title,
      description,
      category,
      tags: data.tags,
      text,
    }
  })

  const index = {
    generatedAt: new Date().toISOString(),
    docs,
  }

  fs.writeFileSync(
    path.join(outputDir, 'search-index.json'),
    JSON.stringify(index, null, 2)
  )

  console.log(`Search index built with ${docs.length} documents`)
}

buildSearchIndex()
