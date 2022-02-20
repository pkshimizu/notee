import ReactMarkdown from 'react-markdown'
import MuiBox from '@mui/material/Box'
import remarkToc from 'remark-toc'
import remarkGfm from 'remark-gfm'

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
      <ReactMarkdown remarkPlugins={[remarkToc, remarkGfm]}>{content}</ReactMarkdown>
    </MuiBox>
  )
}
