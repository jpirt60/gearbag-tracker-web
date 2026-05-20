import type { Database } from '@/lib/supabase/database.types'

// Direct row types from DB
export type GearRow = Database['public']['Tables']['gear']['Row']
export type GearInsert = Database['public']['Tables']['gear']['Insert']
export type GearUpdate = Database['public']['Tables']['gear']['Update']

export type UsageNoteRow = Database['public']['Tables']['usage_notes']['Row']
export type UsageNoteInsert = Database['public']['Tables']['usage_notes']['Insert']
export type UsageNoteUpdate = Database['public']['Tables']['usage_notes']['Update']

// App-level enums (mirror DB CHECK constraints exactly)
export const GEAR_TYPES = [
  'bat',
  'glove',
  'cleats',
  'bag',
  'balls',
  'batting_gloves',
  'other',
] as const
export type GearType = (typeof GEAR_TYPES)[number]

export const GEAR_STATUSES = ['active', 'benched'] as const
export type GearStatus = (typeof GEAR_STATUSES)[number]

// Display labels for UI
export const GEAR_TYPE_LABELS: Record<GearType, string> = {
  bat: 'Bat',
  glove: 'Glove',
  cleats: 'Cleats',
  bag: 'Bag',
  balls: 'Balls',
  batting_gloves: 'Batting Gloves',
  other: 'Other',
}

export const GEAR_STATUS_LABELS: Record<GearStatus, string> = {
  active: 'Active',
  benched: 'Benched',
}