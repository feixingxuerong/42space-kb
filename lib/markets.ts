import fs from 'fs'
import path from 'path'

const contentDir = path.join(process.cwd(), 'content/knowledge')

export interface MarketSnapshot {
  markets: MarketItem[]
  generatedAt: string
}

export interface MarketItem {
  id: string
  question: string
  description?: string
  volume?: number
  liquidity?: number
  closeDate?: string
  createdAt?: string
  updatedAt?: string
  groupItemTitle?: string
  slug?: string
  url?: string
  image?: string
}

/**
 * Find the latest markets-normalized-YYYY-MM-DD.json file in outputs directory.
 */
export function getLatestMarketSnapshot(): MarketSnapshot | null {
  const outputsDir = path.join(contentDir, 'outputs')
  
  if (!fs.existsSync(outputsDir)) {
    return null
  }

  // Find all markets-normalized-*.json files
  const files = fs.readdirSync(outputsDir)
    .filter(f => f.match(/^markets-normalized-\d{4}-\d{2}-\d{2}\.json$/))
    .sort()
    .reverse() // newest first

  if (files.length === 0) {
    return null
  }

  const latestFile = files[0]
  const filePath = path.join(outputsDir, latestFile)

  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(content)
    return data as MarketSnapshot
  } catch (e) {
    console.error(`Failed to parse ${latestFile}:`, e)
    return null
  }
}

/**
 * Get all available snapshot dates.
 */
export function getAvailableSnapshotDates(): string[] {
  const outputsDir = path.join(contentDir, 'outputs')
  
  if (!fs.existsSync(outputsDir)) {
    return []
  }

  return fs.readdirSync(outputsDir)
    .filter(f => f.match(/^markets-normalized-(\d{4}-\d{2}-\d{2})\.json$/))
    .map(f => f.match(/^markets-normalized-(\d{4}-\d{2}-\d{2})\.json$/)?.[1])
    .filter((d): d is string => d !== undefined)
    .sort()
    .reverse()
}
