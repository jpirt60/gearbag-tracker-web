import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex min-h-screen flex-col p-8">
      <header className="flex items-center justify-between border-b pb-4">
        <h1 className="text-xl font-bold">Gear Bag Tracker</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user.email}</span>
          <LogoutButton />
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Welcome to Gear Bag Tracker</h2>
          <p className="text-muted-foreground">
            Your gear list will appear here.
          </p>
        </div>
      </div>
    </main>
  );
}