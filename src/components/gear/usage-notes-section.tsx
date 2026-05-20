'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { formatDistanceToNow } from 'date-fns'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { usageNoteFormSchema } from '@/lib/validation/gear'
import { createUsageNote, deleteUsageNote } from '@/actions/usage-notes'
import type { UsageNoteRow } from '@/lib/types/gear'

interface UsageNotesSectionProps {
  gearId: string
  notes: UsageNoteRow[]
}

export function UsageNotesSection({ gearId, notes }: UsageNotesSectionProps) {
  const router = useRouter()
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  function handleAdd() {
    setError(null)
    const parsed = usageNoteFormSchema.safeParse({ text })
    if (!parsed.success) {
      setError(parsed.error.flatten().fieldErrors.text?.[0] ?? 'Invalid note')
      return
    }

    startTransition(async () => {
      const result = await createUsageNote(gearId, { text })
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Note added')
      setText('')
      router.refresh()
    })
  }

  function handleDelete(noteId: string) {
    setDeletingId(noteId)
    startTransition(async () => {
      const result = await deleteUsageNote(noteId, gearId)
      setDeletingId(null)
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Note deleted')
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Usage Notes</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Quick log entries — games, repairs, observations
        </p>
      </div>

      {/* Add new note */}
      <div className="space-y-2">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What happened? (e.g. used in 2 games, no issues)"
          rows={2}
          disabled={isPending}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button onClick={handleAdd} disabled={isPending || !text.trim()} size="sm">
          {isPending && !deletingId ? 'Adding…' : 'Add Note'}
        </Button>
      </div>

      {/* Existing notes */}
      {notes.length === 0 ? (
        <p className="text-sm text-muted-foreground italic py-4">
          No usage notes yet.
        </p>
      ) : (
        <div className="space-y-2">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="p-3 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {note.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(note.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(note.id)}
                  disabled={isPending}
                  className="text-muted-foreground hover:text-destructive shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}