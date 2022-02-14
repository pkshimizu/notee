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
          plain: true,
        },
        {
          label: 'JSON',
          value: 'json',
          plain: true,
        },
        {
          label: 'XML',
          value: 'xml',
          plain: true,
        },
        {
          label: 'HTML',
          value: 'html',
          plain: true,
        },
        {
          label: 'JavaScript',
          value: 'javascript',
          plain: true,
        },
        {
          label: 'TypeScript',
          value: 'typescript',
          plain: true,
        },
        {
          label: 'CSS',
          value: 'css',
          plain: true,
        },
        {
          label: 'Sass',
          value: 'sass',
          plain: true,
        },
        {
          label: 'C#',
          value: 'csharp',
          plain: true,
        },
        {
          label: 'Python',
          value: 'python',
          plain: true,
        },
        {
          label: 'Ruby',
          value: 'ruby',
          plain: true,
        },
        {
          label: 'Java',
          value: 'java',
          plain: true,
        },
        {
          label: 'Go',
          value: 'golang',
          plain: true,
        },
        {
          label: 'Elixir',
          value: 'elixir',
          plain: true,
        },
        {
          label: 'MySQL',
          value: 'mysql',
          plain: true,
        },
      ]}
      label={'Content Type'}
      onChange={(value) => onChange(value as ContentType)}
    />
  )
}
