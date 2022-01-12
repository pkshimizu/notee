import { Note } from '../../../store/notes'
import TabPanel from '../../atoms/navigation/TabPanel'

type SearchResultsTabPanelProps = {
  value: string
  notes: Note[]
  noteIds: string[]
}

export default function SearchResultsTabPanel({ value }: SearchResultsTabPanelProps) {
  return <TabPanel value={value}></TabPanel>
}
