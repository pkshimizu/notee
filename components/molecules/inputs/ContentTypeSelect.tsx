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
          label: 'Markdown',
          value: 'markdown',
        },
        {
          label: 'JSON',
          value: 'json',
        },
        {
          label: 'XML',
          value: 'xml',
        },
        {
          label: 'HTML',
          value: 'html',
        },
        {
          label: 'JavaScript',
          value: 'javascript',
        },
        {
          label: 'TypeScript',
          value: 'typescript',
        },
        {
          label: 'CSS',
          value: 'css',
        },
        {
          label: 'Sass',
          value: 'sass',
        },
        {
          label: 'C#',
          value: 'csharp',
        },
        {
          label: 'Python',
          value: 'python',
        },
        {
          label: 'Ruby',
          value: 'ruby',
        },
        {
          label: 'Java',
          value: 'java',
        },
        {
          label: 'Go',
          value: 'golang',
        },
        {
          label: 'Elixir',
          value: 'elixir',
        },
        {
          label: 'MySQL',
          value: 'mysql',
        },
      ]}
      label={'Content Type'}
      onChange={(value) => onChange(value as ContentType)}
    />
  )
}
