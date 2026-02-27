import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function Markdown({ content }: { content: string }) {
  return (
    <div className="prose prose-invert prose-zinc max-w-none
      prose-headings:text-zinc-100
      prose-p:text-zinc-300
      prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-zinc-100
      prose-code:text-zinc-200 prose-code:bg-zinc-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
      prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800
      prose-li:text-zinc-300
      prose-blockquote:border-l-4 prose-blockquote:border-zinc-700 prose-blockquote:text-zinc-400 prose-blockquote:italic
      prose-hr:border-zinc-800
      prose-table:border prose-table:border-zinc-800
      prose-th:border prose-th:border-zinc-800 prose-th:bg-zinc-900
      prose-td:border prose-td:border-zinc-800">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
