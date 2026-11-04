"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createSupabaseBrowserClient, isSupabaseBrowserConfigured } from "@/lib/supabase/browser";
import { clearTopicFeedSnapshot } from "@/lib/topicFeedState";

export function FooterSignOut({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isSupabaseBrowserConfigured()) return;

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
    if (!isSupabaseBrowserConfigured()) return;

    setBusy(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      setBusy(false);
      return;
    }
    clearTopicFeedSnapshot();
    router.replace("/");
    router.refresh();
  }

  if (!authenticated) return null;

  return (
    <button
      className={compact ? "topic-toolbar-sign-out" : "footer-sign-out"}
      type="button"
      onClick={() => void signOut()}
      disabled={busy}
      aria-label={compact ? (busy ? "Saindo da conta" : "Sair da conta") : undefined}
      title={compact ? (busy ? "Saindo da conta" : "Sair da conta") : undefined}
    >
      <LogOut size={15} aria-hidden="true" />
      {!compact && (busy ? "Saindo…" : "Sair da conta")}
    </button>
  );
}
