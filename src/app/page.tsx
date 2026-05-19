import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between border-b px-8 py-4">
        <h1 className="text-xl font-bold">Gear Bag Tracker</h1>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </header>

      <section className="flex flex-1 items-center justify-center px-8">
        <div className="max-w-2xl space-y-6 text-center">
          <h2 className="text-5xl font-bold tracking-tight">
            Never show up missing gear again.
          </h2>
          <p className="text-lg text-muted-foreground">
            Track your bats, gloves, cleats, and everything else in your
            softball bag. Built for athletes who hate scrambling before games.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/signup">Get started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">I already have an account</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t px-8 py-6 text-center text-sm text-muted-foreground">
        <p>Built by Jaron Pirtle</p>
        <p className="mt-2">
          <Link
            href="https://jpirt60.github.io/gearbag-tracker/"
            className="underline"
          >
            Privacy policy
          </Link>
        </p>
      </footer>
    </main>
  );
}