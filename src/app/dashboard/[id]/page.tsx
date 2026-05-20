import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GearForm } from '@/components/gear/gear-form'
import { DeleteGearButton } from '@/components/gear/delete-gear-button'
import { UsageNotesSection } from '@/components/gear/usage-notes-section'
import { getGearById } from '@/actions/gear'
import { getUsageNotesByGear } from '@/actions/usage-notes'

export default async function GearDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const gear = await getGearById(id)
  if (!gear) notFound()

  const notes = await getUsageNotesByGear(id)

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
        <Link href="/dashboard">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Link>
      </Button>

      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Edit Gear</h1>
          <p className="text-muted-foreground mt-1">
            Update details or add usage notes
          </p>
        </div>
        <DeleteGearButton id={gear.id} label={`${gear.brand} ${gear.model}`} />
      </div>

      <div className="space-y-12">
        <GearForm mode="edit" initial={gear} />
        <UsageNotesSection gearId={gear.id} notes={notes} />
      </div>
    </div>
  )
}