'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  GEAR_TYPES,
  GEAR_STATUSES,
  GEAR_TYPE_LABELS,
  GEAR_STATUS_LABELS,
  type GearType,
  type GearStatus,
  type GearRow,
} from '@/lib/types/gear'
import {
  gearFormSchema,
  type GearFormValues,
} from '@/lib/validation/gear'
import { createGear, updateGear } from '@/actions/gear'

interface GearFormProps {
  initial?: GearRow
  mode: 'create' | 'edit'
}

export function GearForm({ initial, mode }: GearFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  const [type, setType] = useState<GearType>(
    (initial?.type as GearType) ?? 'bat'
  )
  const [brand, setBrand] = useState(initial?.brand ?? '')
  const [model, setModel] = useState(initial?.model ?? '')
  const [status, setStatus] = useState<GearStatus>(
    (initial?.status as GearStatus) ?? 'active'
  )
  const [notes, setNotes] = useState(initial?.notes ?? '')

  function handleSubmit() {
    setErrors({})

    const values: GearFormValues = {
      type,
      brand,
      model,
      status,
      notes,
    }

    // Client-side validation first for instant feedback
    const parsed = gearFormSchema.safeParse(values)
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors)
      return
    }

    startTransition(async () => {
      const result =
        mode === 'create'
          ? await createGear(values)
          : await updateGear(initial!.id, values)

      if (!result.ok) {
        if (result.fieldErrors) setErrors(result.fieldErrors)
        toast.error(result.error)
        return
      }

      toast.success(mode === 'create' ? 'Gear added' : 'Gear updated')
      router.push('/dashboard')
      router.refresh()
    })
  }

  return (
    <div className="space-y-6">
      {/* Type */}
      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <Select value={type} onValueChange={(v) => setType(v as GearType)}>
          <SelectTrigger id="type">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GEAR_TYPES.map((t) => (
              <SelectItem key={t} value={t}>
                {GEAR_TYPE_LABELS[t]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type?.[0] && (
          <p className="text-sm text-destructive">{errors.type[0]}</p>
        )}
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <Label htmlFor="brand">Brand</Label>
        <Input
          id="brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="e.g. Easton"
          disabled={isPending}
        />
        {errors.brand?.[0] && (
          <p className="text-sm text-destructive">{errors.brand[0]}</p>
        )}
      </div>

      {/* Model */}
      <div className="space-y-2">
        <Label htmlFor="model">Model</Label>
        <Input
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="e.g. Ghost Advanced"
          disabled={isPending}
        />
        {errors.model?.[0] && (
          <p className="text-sm text-destructive">{errors.model[0]}</p>
        )}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={status}
          onValueChange={(v) => setStatus(v as GearStatus)}
        >
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {GEAR_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {GEAR_STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.status?.[0] && (
          <p className="text-sm text-destructive">{errors.status[0]}</p>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes about this item"
          rows={4}
          disabled={isPending}
        />
        {errors.notes?.[0] && (
          <p className="text-sm text-destructive">{errors.notes[0]}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending
            ? mode === 'create'
              ? 'Adding…'
              : 'Saving…'
            : mode === 'create'
              ? 'Add Gear'
              : 'Save Changes'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard')}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}