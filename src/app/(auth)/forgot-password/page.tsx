"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setError(null);
    if (!email.includes("@")) { setError("Please enter a valid email"); return; }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/confirm?type=recovery`,
    });
    setLoading(false);

    // Always show success — don't reveal whether an email is registered.
    if (error && !error.message.toLowerCase().includes("rate")) {
      setError(error.message);
      return;
    }
    setSent(true);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{sent ? "Check your inbox" : "Reset your password"}</CardTitle>
          <CardDescription>
            {sent
              ? `If an account exists for ${email}, we've sent a reset link.`
              : "Enter your email and we'll send you a link to reset your password."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!sent && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email" type="email" placeholder="you@example.com"
                  autoComplete="email" value={email} disabled={loading}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && (
                <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
              )}
              <Button className="w-full" disabled={loading} onClick={onSubmit}>
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </>
          )}
          <p className="text-center text-sm text-muted-foreground">
            <Link href="/login" className="font-medium underline">Back to log in</Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}