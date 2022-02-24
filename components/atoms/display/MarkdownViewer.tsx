import ReactMarkdown from 'react-markdown'
import MuiBox from '@mui/material/Box'
import remarkGfm from 'remark-gfm'
import remarkEmoji from 'remark-emoji'
import remarkGemoji from 'remark-gemoji'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'
import { useEffect, useMemo, useRef } from 'react'

const rehypeToc = require('@jsdevtools/rehype-toc')

type MarkdownViewerProps = {
  content: string
  withToc?: boolean
  row?: number
}

function findElement(elements: HTMLCollection | undefined, row: number): Element | undefined {
  if (!elements) {
    return undefined
  }
  const items: Element[] = [].slice.call(elements)
  for (const item of items) {
    const namedItem = item.attributes.getNamedItem('data-sourcepos')
    if (namedItem?.value?.startsWith(`${row}:`)) {
      return item
    }
    if (item.children) {
      const child = findElement(item.children, row)
      if (child) {
        return child
      }
    }
  }

  return undefined
}

export default function MarkdownViewer({ content, withToc, row }: MarkdownViewerProps) {
  const ref = useRef<HTMLDivElement>()
  useEffect(() => {
    if (row) {
      const target = findElement(ref.current?.children, row)
      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [ref, row])

  return useMemo(() => {
    const remarkPlugins = [remarkGfm, remarkEmoji, remarkGemoji]
    const rehypePlugins = [rehypeStringify, rehypeSlug, rehypeHighlight]
    if (withToc) {
      rehypePlugins.push(rehypeToc)
    }

    return (
      <MuiBox
        ref={ref}
        sx={{
          height: '100%',
          overflowY: 'auto',
          overflowWrap: 'anywhere',
          '& img': {
            maxWidth: '100%',
          },
        }}
        p={2}
      >
        <ReactMarkdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins} sourcePos>
          {content}
        </ReactMarkdown>
      </MuiBox>
    )
  }, [ref, withToc, content])
}
