import { ContentType } from '../../atoms/inputs/TextEditor'
import Select from '../../atoms/inputs/Select'

type ContentTypeSelectProps = {
  value: ContentType
  onChange: (_value: ContentType) => void
}

export default function ContentTypeSelect({ value, onChange }: ContentTypeSelectProps) {
  return (
    <Select
      value={value}
      items={[
        {
          label: { value: 'Markdown', plain: true },
          value: 'markdown',
        },
        {
          label: { value: 'JSON', plain: true },
          value: 'json',
        },
        {
          label: { value: 'XML', plain: true },
          value: 'xml',
        },
        {
          label: { value: 'HTML', plain: true },
          value: 'html',
        },
        {
          label: { value: 'JavaScript', plain: true },
          value: 'javascript',
        },
        {
          label: { value: 'TypeScript', plain: true },
          value: 'typescript',
        },
        {
          label: { value: 'CSS', plain: true },
          value: 'css',
        },
        {
          label: { value: 'Sass', plain: true },
          value: 'sass',
        },
        {
          label: { value: 'C#', plain: true },
          value: 'csharp',
        },
        {
          label: { value: 'Python', plain: true },
          value: 'python',
        },
        {
          label: { value: 'Ruby', plain: true },
          value: 'ruby',
        },
        {
          label: { value: 'Java', plain: true },
          value: 'java',
        },
        {
          label: { value: 'Go', plain: true },
          value: 'golang',
        },
        {
          label: { value: 'Elixir', plain: true },
          value: 'elixir',
        },
        {
          label: { value: 'MySQL', plain: true },
          value: 'mysql',
        },
      ]}
      label={{ value: 'Content Type' }}
      onChange={(value) => onChange(value as ContentType)}
    />
  )
}
