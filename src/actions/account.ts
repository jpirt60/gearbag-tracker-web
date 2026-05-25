'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string }

export async function deleteAccount(): Promise<ActionResult> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'Not authenticated' }

  const { error } = await supabase.rpc('delete_current_user')

  if (error) {
    console.error('deleteAccount error:', error)
    return { ok: false, error: 'Failed to delete account' }
  }

  // Sign out to clear the session (the user row is already gone)
  await supabase.auth.signOut()

  return { ok: true, data: undefined }
}