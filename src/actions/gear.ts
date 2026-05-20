'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { gearFormSchema, type GearFormValues } from '@/lib/validation/gear'
import type { GearRow } from '@/lib/types/gear'

export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> }

/**
 * Get all non-deleted gear for the current user, newest first.
 */
export async function getGearList(): Promise<GearRow[]> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data, error } = await supabase
    .from('gear')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getGearList error:', error)
    return []
  }
  return data ?? []
}

/**
 * Get a single gear item by ID (must belong to current user).
 */
export async function getGearById(id: string): Promise<GearRow | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data, error } = await supabase
    .from('gear')
    .select('*')
    .eq('id', id)
    .is('deleted_at', null)
    .maybeSingle()

  if (error) {
    console.error('getGearById error:', error)
    return null
  }
  return data
}

/**
 * Create a new gear item for the current user.
 */
export async function createGear(values: GearFormValues): Promise<ActionResult<GearRow>> {
  const parsed = gearFormSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Invalid form data',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('gear')
    .insert({
      user_id: user.id,
      type: parsed.data.type,
      brand: parsed.data.brand,
      model: parsed.data.model,
      status: parsed.data.status,
      notes: parsed.data.notes || null,
    })
    .select()
    .single()

  if (error) {
    console.error('createGear error:', error)
    return { ok: false, error: 'Failed to create gear' }
  }

  revalidatePath('/dashboard')
  return { ok: true, data }
}

/**
 * Update an existing gear item (must belong to current user).
 */
export async function updateGear(
  id: string,
  values: GearFormValues
): Promise<ActionResult<GearRow>> {
  const parsed = gearFormSchema.safeParse(values)
  if (!parsed.success) {
    return {
      ok: false,
      error: 'Invalid form data',
      fieldErrors: parsed.error.flatten().fieldErrors,
    }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Not authenticated' }

  const { data, error } = await supabase
    .from('gear')
    .update({
      type: parsed.data.type,
      brand: parsed.data.brand,
      model: parsed.data.model,
      status: parsed.data.status,
      notes: parsed.data.notes || null,
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('updateGear error:', error)
    return { ok: false, error: 'Failed to update gear' }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/dashboard/${id}`)
  return { ok: true, data }
}

/**
 * Soft delete a gear item by setting deleted_at.
 */
export async function deleteGear(id: string): Promise<ActionResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Not authenticated' }

  const { error } = await supabase
    .from('gear')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    console.error('deleteGear error:', error)
    return { ok: false, error: 'Failed to delete gear' }
  }

  revalidatePath('/dashboard')
  return { ok: true, data: undefined }
}