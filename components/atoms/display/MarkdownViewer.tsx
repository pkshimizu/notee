import ReactMarkdown from 'react-markdown'
import MuiBox from '@mui/material/Box'
import remarkGfm from 'remark-gfm'
import remarkEmoji from 'remark-emoji'
import remarkGemoji from 'remark-gemoji'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
const rehypeToc = require('@jsdevtools/rehype-toc')

type MarkdownViewerProps = {
  content: string
}

export default function MarkdownViewer({ content }: MarkdownViewerProps) {
  return (
    <MuiBox
      sx={{
        height: '100%',
        overflowY: 'auto',
      }}
      p={2}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkEmoji, remarkGemoji]}
        rehypePlugins={[rehypeStringify, rehypeSlug, rehypeToc]}
      >
        {content}
      </ReactMarkdown>
    </MuiBox>
  )
}
