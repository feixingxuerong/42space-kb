import Link from 'next/link'
import { getLatestMarketSnapshot, getAvailableSnapshotDates, type MarketItem } from '@/lib/markets'

function formatVolume(volume?: number): string {
  if (!volume) return '-'
  if (volume >= 1e6) return `$${(volume / 1e6).toFixed(1)}M`
  if (volume >= 1e3) return `$${(volume / 1e3).toFixed(1)}K`
  return `$${volume.toFixed(0)}`
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return '-'
  try {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

function MarketCard({ market }: { market: MarketItem }) {
  return (
    <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-zinc-100 line-clamp-2">{market.question}</h3>
        {market.image && (
          <img 
            src={market.image} 
            alt="" 
            className="w-12 h-12 rounded object-cover flex-shrink-0"
          />
        )}
      </div>
      
      {market.description && (
        <p className="text-sm text-zinc-400 mt-2 line-clamp-2">{market.description}</p>
      )}
      
      <div className="flex items-center gap-4 mt-3 text-xs text-zinc-500">
        {market.volume !== undefined && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            {formatVolume(market.volume)}
          </span>
        )}
        
        {market.closeDate && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(market.closeDate)}
          </span>
        )}
        
        {market.groupItemTitle && (
          <span className="px-2 py-0.5 bg-zinc-800 rounded">
            {market.groupItemTitle}
          </span>
        )}
      </div>
      
      {market.url && (
        <a 
          href={market.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 mt-3 inline-flex items-center gap-1"
        >
          查看市场
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  )
}

export default function MarketsLatestPage() {
  const snapshot = getLatestMarketSnapshot()
  const dates = getAvailableSnapshotDates()

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
            <Link href="/" className="hover:text-zinc-300">Home</Link>
            <span>/</span>
            <span>Markets</span>
          </div>
          <h1 className="text-3xl font-bold">Latest Markets</h1>
          <p className="text-zinc-400 mt-2">
            Polymarket 市场快照
          </p>
        </header>

        {/* Available Dates */}
        {dates.length > 0 && (
          <div className="mb-6 flex items-center gap-2 text-sm">
            <span className="text-zinc-500">Available snapshots:</span>
            {dates.slice(0, 5).map((date) => (
              <span 
                key={date}
                className={`px-2 py-1 rounded ${
                  date === snapshot?.generatedAt?.slice(0, 10)
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {date}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        {snapshot ? (
          <div>
            <div className="text-sm text-zinc-500 mb-4">
              共 {snapshot.markets.length} 个市场 · 数据生成于 {formatDate(snapshot.generatedAt)}
            </div>
            
            <div className="grid gap-4">
              {snapshot.markets.map((market) => (
                <MarketCard key={market.id} market={market} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-zinc-500">
            <p className="mb-4">暂无市场数据</p>
            <p className="text-sm">
              请运行 42space-task 生成 normalized snapshot
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export const dynamic = 'force-static'
