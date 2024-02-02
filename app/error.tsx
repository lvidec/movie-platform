"use client";

import { useEffect } from "react";
import { ErrorUI } from "@/components/states/ErrorUI";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorUI reset={reset} />;
}
