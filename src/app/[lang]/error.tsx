"use client";
import { container, primaryButton } from "@/lib/styles";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main
      id="main-content"
      className={`${container} flex min-h-[65dvh] flex-col items-start justify-center gap-6`}
    >
      <h1 className="text-4xl font-medium">
        Não foi possível carregar esta página.
      </h1>
      <p className="text-muted">Please try again.</p>
      <button className={`${primaryButton} pr-6`} onClick={reset}>
        Tentar novamente / Try again
      </button>
    </main>
  );
}
