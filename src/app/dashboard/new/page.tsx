import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GearForm } from '@/components/gear/gear-form'

export default function NewGearPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
        <Link href="/dashboard">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-1">Add Gear</h1>
      <p className="text-muted-foreground mb-8">
        Add a new item to your gear bag
      </p>

      <GearForm mode="create" />
    </div>
  )
}