import Link from "next/link";

export default function AuthError() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="mx-auto max-w-md text-center">
        <h1 className="text-2xl font-semibold">Verification failed</h1>
        <p className="mt-2 text-muted-foreground">
          That link may have expired or already been used. Try logging in, or
          request a new confirmation email.
        </p>
        <Link href="/login" className="mt-6 inline-block underline">
          Back to log in
        </Link>
      </div>
    </main>
  );
}