import { redirect } from "next/navigation";
import { CheckInbox } from "@/components/auth/check-inbox";

export default async function CheckEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  if (!email) redirect("/signup");

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <CheckInbox email={email} />
    </main>
  );
}