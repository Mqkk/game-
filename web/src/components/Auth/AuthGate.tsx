"use client";

import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { usePathname, useRouter } from "next/navigation";
import { useStores } from "@/app/providers";

export const AuthGate = observer(function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = useStores();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Если токен ещё не гидратился, auth.isAuthed может быть false на первый тик.
    // Но у нас hydrate вызывается в Providers, поэтому тут достаточно мягко редиректнуть.
    if (!auth.isAuthed) {
      const next = encodeURIComponent(pathname || "/");
      router.replace(`/login?next=${next}`);
    }
  }, [auth.isAuthed, pathname, router]);

  if (!auth.isAuthed) return null;
  return <>{children}</>;
});
