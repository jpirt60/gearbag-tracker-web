'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteAccount } from '@/actions/account'

export function DeleteAccountSection() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [isPending, startTransition] = useTransition()

  const canDelete = confirmText === 'DELETE'

  function handleDelete() {
    if (!canDelete) return
    startTransition(async () => {
      const result = await deleteAccount()
      if (!result.ok) {
        toast.error(result.error)
        return
      }
      toast.success('Account deleted')
      setOpen(false)
      router.push('/login')
      router.refresh()
    })
  }

  return (
    <section className="border border-destructive/20 rounded-lg p-6">
      <div className="flex items-start gap-3 mb-2">
        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <h2 className="text-xl font-semibold text-destructive">Danger zone</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Deleting your account is permanent. All your gear, usage notes, and
        sign-in data will be removed immediately and cannot be recovered.
      </p>

      <Dialog open={open} onOpenChange={(v) => {
        setOpen(v)
        if (!v) setConfirmText('')
      }}>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete my account</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete your account?</DialogTitle>
            <DialogDescription>
              This permanently removes your account, gear, and usage notes from
              all your devices. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label htmlFor="confirm">
              Type <span className="font-mono font-semibold">DELETE</span> to confirm
            </Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="DELETE"
              disabled={isPending}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={!canDelete || isPending}
            >
              {isPending ? 'Deleting…' : 'Delete account'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}