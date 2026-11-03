"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export function FooterSignOut() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    let mounted = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (mounted) setAuthenticated(Boolean(data.session));
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setAuthenticated(Boolean(session));
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    setBusy(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      setBusy(false);
      return;
    }
    router.replace("/");
    router.refresh();
  }

  if (!authenticated) return null;

  return (
    <button className="footer-sign-out" type="button" onClick={() => void signOut()} disabled={busy}>
      <LogOut size={15} aria-hidden="true" />
      {busy ? "Saindo…" : "Sair da conta"}
    </button>
  );
}
