import ReactMarkdown from 'react-markdown'
import MuiBox from '@mui/material/Box'

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
      <ReactMarkdown>{content}</ReactMarkdown>
    </MuiBox>
  )
}
