import Link from 'next/link'
import { getAllDocs, getRecentDocs, getIndexSyncInfo } from '@/lib/docs'
import { getIndexChapters } from '@/lib/nav'

export default function Home() {
  const allDocs = getAllDocs()
  const recentDocs = getRecentDocs(5)
  const syncInfo = getIndexSyncInfo()
  const chapters = getIndexChapters()

  // Format generatedAt for display
  const formattedGeneratedAt = syncInfo.generatedAt
    ? new Date(syncInfo.generatedAt).toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'N/A'

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">42.space KB</h1>
          <p className="text-zinc-400">42.space 知识库</p>
        </header>

        {/* Stats */}
        <section className="mb-10 p-5 bg-zinc-900/50 rounded-lg border border-zinc-800">
          <h2 className="text-lg font-semibold mb-4 text-zinc-300">Stats</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-500">文档总数</span>
              <p className="text-xl font-medium">{allDocs.length}</p>
            </div>
            <div>
              <span className="text-zinc-500">Index Generated</span>
              <p className="text-xl font-medium">{formattedGeneratedAt}</p>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-zinc-300">快捷入口</h2>
          <div className="flex gap-3">
            <Link
              href="/docs/index"
              className="px-4 py-2 bg-zinc-100 text-zinc-900 rounded-md font-medium hover:bg-zinc-200 transition-colors"
            >
              Index
            </Link>
            <Link
              href="/docs/sources"
              className="px-4 py-2 bg-zinc-800 text-zinc-100 rounded-md font-medium hover:bg-zinc-700 transition-colors"
            >
              Sources
            </Link>
          </div>
        </section>

        {/* Recent Updates */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4 text-zinc-300">最近更新</h2>
          <ul className="space-y-3">
            {recentDocs.map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={`/docs/${doc.slug}`}
                  className="block p-3 bg-zinc-900/50 rounded-md hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="font-medium text-zinc-100">{doc.title}</div>
                  <div className="text-xs text-zinc-500 mt-1">
                    {doc.mtime
                      ? new Date(doc.mtime).toLocaleString('zh-CN', {
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Chapter Status */}
        {chapters.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4 text-zinc-300">章节状态</h2>
            <ul className="space-y-2">
              {chapters.map((chapter) => (
                <li key={chapter.name} className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      chapter.status === 'done'
                        ? 'bg-green-500'
                        : chapter.status === 'in-progress'
                        ? 'bg-yellow-500'
                        : 'bg-zinc-600'
                    }`}
                  />
                  <span>{chapter.name}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  )
}
