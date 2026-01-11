"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface BlogMarkdownProps {
  content: string
}

export function BlogMarkdown({ content }: BlogMarkdownProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none mt-8">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
