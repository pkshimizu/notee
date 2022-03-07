import { diff_match_patch } from 'diff-match-patch'
import { NoteLog } from '../store/notes/models'

function restoreContent(
  dmp: diff_match_patch,
  content: string,
  logs: NoteLog[],
  logId: string
): { content: string; nextContent: string } {
  if (logs.length > 0) {
    const log = logs[0]
    if (log && log.diff) {
      const patches = dmp.patch_fromText(log.diff)
      const nextContent = dmp.patch_apply(patches, content)[0]
      if (log.id === logId) {
        return { content, nextContent }
      }
      return restoreContent(dmp, nextContent, logs.slice(1, logs.length), logId)
    }
    if (log && log.content !== undefined) {
      if (log.id === logId) {
        return { content: content, nextContent: log.content }
      }
      return restoreContent(dmp, log.content, logs.slice(1, logs.length), logId)
    }
  }
  return { content: '', nextContent: '' }
}

export default function useNoteLog() {
  const restore = (logs: NoteLog[], logId: string): { content: string; nextContent: string } => {
    const dmp = new diff_match_patch()
    return restoreContent(dmp, '', logs, logId)
  }

  return {
    restore,
  }
}
