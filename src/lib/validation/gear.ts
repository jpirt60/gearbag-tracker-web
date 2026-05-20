import { z } from 'zod'
import { GEAR_TYPES, GEAR_STATUSES } from '@/lib/types/gear'

export const gearFormSchema = z.object({
  type: z.enum(GEAR_TYPES),
  brand: z.string().trim().min(1, 'Brand is required').max(100),
  model: z.string().trim().min(1, 'Model is required').max(100),
  status: z.enum(GEAR_STATUSES),
  notes: z.string().trim().max(2000).optional().or(z.literal('')),
})

export type GearFormValues = z.infer<typeof gearFormSchema>

export const usageNoteFormSchema = z.object({
  text: z.string().trim().min(1, 'Note cannot be empty').max(1000),
})

export type UsageNoteFormValues = z.infer<typeof usageNoteFormSchema>