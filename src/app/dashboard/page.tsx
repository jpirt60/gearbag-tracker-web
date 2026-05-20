import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getGearList } from '@/actions/gear'
import { GearList } from '@/components/gear/gear-list'

export default async function DashboardPage() {
  const gear = await getGearList()

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Gear</h1>
          <p className="text-muted-foreground mt-1">
            {gear.length === 0
              ? 'No gear yet — add your first item'
              : `${gear.length} ${gear.length === 1 ? 'item' : 'items'}`}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Gear
          </Link>
        </Button>
      </div>

      <GearList items={gear} />
    </div>
  )
}