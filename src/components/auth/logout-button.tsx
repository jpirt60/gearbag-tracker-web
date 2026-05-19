"use client";

import { useState } from "react";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    // No need to setIsLoading(false) — the redirect happens before this would run
  };

  return (
    <Button
      variant="outline"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : "Log out"}
    </Button>
  );
}