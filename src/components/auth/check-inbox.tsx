"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function CheckInbox({ email }: { email: string }) {
  const [cooldown, setCooldown] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  async function resend() {
    setStatus("sending");
    const supabase = createClient();
    const { error } = await supabase.auth.resend({ type: "signup", email });
    if (error) {
      setStatus("error");
    } else {
      setStatus("sent");
      setCooldown(60);
    }
  }

  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="text-2xl font-semibold">Check your inbox</h1>
      <p className="mt-2 text-muted-foreground">
        We sent a confirmation link to <strong>{email}</strong>. Click it to
        finish setting up your account.
      </p>
      <Button
        onClick={resend}
        disabled={cooldown > 0 || status === "sending"}
        className="mt-6"
      >
        {cooldown > 0
          ? `Resend in ${cooldown}s`
          : status === "sending"
          ? "Sending…"
          : "Resend email"}
      </Button>
      {status === "sent" && (
        <p className="mt-3 text-sm text-green-600">Sent — check again.</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-red-600">
          Couldn&apos;t resend. Try again shortly.
        </p>
      )}
    </div>
  );
}