import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  GEAR_TYPE_LABELS,
  GEAR_STATUS_LABELS,
  type GearRow,
  type GearType,
  type GearStatus,
} from '@/lib/types/gear'

interface GearListProps {
  items: GearRow[]
}

export function GearList({ items }: GearListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16 border-2 border-dashed border-muted rounded-lg">
        <p className="text-muted-foreground">
          Your gear bag is empty. Click <strong>Add Gear</strong> to get started.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <Link key={item.id} href={`/dashboard/${item.id}`}>
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary">
                      {GEAR_TYPE_LABELS[item.type as GearType] ?? item.type}
                    </Badge>
                    <Badge
                      variant={item.status === 'active' ? 'default' : 'outline'}
                    >
                      {GEAR_STATUS_LABELS[item.status as GearStatus] ?? item.status}
                    </Badge>
                  </div>
                  <h3 className="font-semibold truncate">
                    {item.brand} {item.model}
                  </h3>
                  {item.notes && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {item.notes}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}