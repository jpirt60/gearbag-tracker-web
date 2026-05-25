import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DeleteAccountSection } from '@/components/account/delete-account-section'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
        <Link href="/dashboard">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back
        </Link>
      </Button>

      <h1 className="text-3xl font-bold mb-1">Settings</h1>
      <p className="text-muted-foreground mb-8">
        Manage your account
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-2">Account</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Signed in as <span className="font-medium">{user.email}</span>
          </p>
        </section>

        <DeleteAccountSection />
      </div>
    </div>
  )
}