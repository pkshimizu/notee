import ReactMarkdown from 'react-markdown'
import MuiBox from '@mui/material/Box'
import remarkGfm from 'remark-gfm'
import remarkEmoji from 'remark-emoji'
import remarkGemoji from 'remark-gemoji'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css';

const rehypeToc = require('@jsdevtools/rehype-toc')

type MarkdownViewerProps = {
  content: string
  withToc?: boolean
}

export default function MarkdownViewer({ content, withToc }: MarkdownViewerProps) {
  const remarkPlugins = [remarkGfm, remarkEmoji, remarkGemoji]
  const rehypePlugins = [rehypeStringify, rehypeSlug, rehypeHighlight]
  if (withToc) {
    rehypePlugins.push(rehypeToc)
  }
  return (
    <MuiBox
      sx={{
        height: '100%',
        overflowY: 'auto',
      }}
      p={2}
    >
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
      >
        {content}
      </ReactMarkdown>
    </MuiBox>
  )
}
