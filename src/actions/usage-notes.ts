'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { usageNoteFormSchema, type UsageNoteFormValues } from '@/lib/validation/gear'
import type { UsageNoteRow } from '@/lib/types/gear'
import type { ActionResult } from './gear'

/**
 * Get all non-deleted usage notes for a specific gear item, newest first.
 */
export async function getUsageNotesByGear(gearId: string): Promise<UsageNoteRow[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from('usage_notes')
    .select('*')
    .eq('gear_id', gearId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getUsageNotesByGear error:', error)
    return []
  }
  return data ?? []
}

/**
 * Add a new usage note to a gear item.
 */
export async function createUsageNote(
  gearId: string,
  values: UsageNoteFormValues
): Promise<ActionResult<UsageNoteRow>> {
  const parsed = usageNoteFormSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Invalid note',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('usage_notes')
    .insert({
      gear_id: gearId,
      user_id: user.id,
      text: parsed.data.text,
    })
    .select()
    .single()

  if (error) {
    console.error('createUsageNote error:', error)
    return { ok: false, error: 'Failed to add note' }
  }

  revalidatePath(`/dashboard/${gearId}`)
  return { ok: true, data }
}

/**
 * Soft delete a usage note.
 */
export async function deleteUsageNote(
  id: string,
  gearId: string
): Promise<ActionResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Not authenticated' }

  const { error } = await supabase
    .from('usage_notes')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('deleteUsageNote error:', error)
    return { ok: false, error: 'Failed to delete note' }
  }

  revalidatePath(`/dashboard/${gearId}`)
  return { ok: true, data: undefined }
}