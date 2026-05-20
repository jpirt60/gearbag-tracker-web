import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { Package, Trophy, RefreshCw } from "lucide-react";

const PLAY_STORE_OPT_IN =
  "https://play.google.com/apps/testing/io.github.jpirt60.gearbag_tracker";

export default async function LandingPage() {
  // Auto-redirect authenticated users to their dashboard
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top nav */}
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            Gear Bag Tracker
          </Link>
          <nav className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign up</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
              Closed beta · Android
            </div>
            <h1 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight leading-tight max-w-[14ch]">
              Know what&apos;s in your bag before you hit the field.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              A softball gear tracker built by a player, for players. Log every
              bat, glove, and accessory. Stay tournament-ready.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a
                  href={PLAY_STORE_OPT_IN}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join the closed beta
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Log in to web app</Link>
              </Button>
            </div>
          </div>

          
          {/* Screenshot slot — drop a real Flutter screenshot here */}
          <div className="relative">
            <div className="max-w-xs mx-auto rounded-2xl border bg-muted/30 overflow-hidden shadow-xl">
              <Image
                src="/screenshot-app.png"
                alt="Gear Bag Tracker app showing a softball gear inventory"
                width={1080}
                height={2400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-3xl font-bold tracking-tight text-center">
            Built for the bag
          </h2>
          <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
            Three things every serious slowpitch player needs, in one app.
          </p>

          <div className="mt-14 grid md:grid-cols-3 gap-8">
            <FeatureBlock
              icon={<Package className="h-6 w-6" />}
              title="Track every piece of gear"
              body="From bats to batting gloves, log condition, purchase date, and notes for every item in your bag. Find it fast when you need it."
            />
            <FeatureBlock
              icon={<Trophy className="h-6 w-6" />}
              title="Built for tournament play"
              body="Made by a competitive slowpitch player chasing States and Worlds. Designed for the gear loads serious tournament teams actually carry."
            />
            <FeatureBlock
              icon={<RefreshCw className="h-6 w-6" />}
              title="Sync across devices"
              body="Take notes on your phone, manage your bag from your laptop. Cloud sync arrives in the next release."
              badge="Coming v1.1"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-b">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Try the beta
          </h2>
          <p className="mt-3 text-muted-foreground">
            Currently in closed testing on Google Play. Open to softball
            players who want to help shape v1.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <a
                href={PLAY_STORE_OPT_IN}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the closed beta
              </a>
            </Button>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function FeatureBlock({
  icon,
  title,
  body,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  badge?: string;
}) {
  return (
    <div className="rounded-xl border p-6 bg-card">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="mt-4 flex items-center gap-2">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        {badge && (
          <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            {badge}
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {body}
      </p>
    </div>
  );
}
