"use client";

import Link from "next/link";
import { useMemo, useRef, useState, type FormEvent } from "react";
import { DiscoveryHeader } from "./DiscoveryHeader";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { safeReturnTo } from "@/lib/safeReturnTo";
import { ArrowLeft } from "lucide-react";

export function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const returnTo = useMemo(() => safeReturnTo(searchParams.get("returnTo")), [searchParams]);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    setError("");
    setMessage("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Informe um e-mail válido.");
      return;
    }
    if (password.length < 8) {
      setError("Sua senha precisa ter pelo menos 8 caracteres.");
      return;
    }
    if (mode === "signup" && password !== confirmation) {
      setError("As senhas não coincidem.");
      return;
    }

    submitting.current = true;
    setBusy(true);
    try {
      const supabase = createSupabaseBrowserClient();
      if (mode === "signup") {
        const callback = new URL("/auth/callback", window.location.origin);
        callback.searchParams.set("returnTo", returnTo);
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: callback.toString() },
        });
        if (authError) throw authError;
        if (!data.session) {
          setMessage("Conta criada. Confira seu e-mail para confirmar o endereço e concluir o acesso.");
          return;
        }
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (authError) throw authError;
      }

      // Resolve server-side account/subscription status before continuing; this never grants Premium.
      await fetch("/api/auth/me", { cache: "no-store" });
      router.replace(returnTo);
      router.refresh();
    } catch (reason) {
      const code = reason && typeof reason === "object" && "code" in reason ? String(reason.code) : "";
      const text = reason instanceof Error ? reason.message : "";
      setError(code === "invalid_credentials" || text.includes("Invalid login credentials")
        ? "E-mail ou senha incorretos. Confira o e-mail e digite sua senha novamente."
        : code === "email_not_confirmed" ? "Confirme seu e-mail antes de entrar. Confira também a pasta de spam."
        : /rate_limit|too_many/i.test(code) || /rate limit/i.test(text) ? "Muitas tentativas. Aguarde alguns minutos antes de tentar novamente."
        : /fetch|network|connection/i.test(text) ? "Não foi possível conectar. Confira sua conexão e tente novamente."
        : "Não foi possível concluir o acesso. Tente novamente em alguns instantes.");
    } finally {
      submitting.current = false;
      setBusy(false);
    }
  }

  return (
    <div className="auth-layout">
      <DiscoveryHeader />
      <section className="auth-card" aria-labelledby="auth-title">
        <h1 id="auth-title">{mode === "signin" ? "Boas-vindas de volta" : "Crie sua conta Prisma"}</h1>
        <p className="auth-card__intro">Entre ou crie sua conta gratuita para continuar. O Premium é verificado separadamente e só pode ser assinado no aplicativo.</p>
        <div className="auth-tabs" role="group" aria-label="Tipo de acesso">
          <button type="button" disabled={busy} aria-pressed={mode === "signin"} onClick={() => { setMode("signin"); setError(""); setMessage(""); }}>Entrar</button>
          <button type="button" disabled={busy} aria-pressed={mode === "signup"} onClick={() => { setMode("signup"); setError(""); setMessage(""); }}>Criar conta</button>
        </div>
        <form className="auth-form" onSubmit={submit} aria-busy={busy} aria-describedby={error || message ? "auth-feedback" : undefined}>
          <fieldset disabled={busy}>
          <label htmlFor="auth-email">E-mail</label>
          <input id="auth-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="auth-password">Senha</label>
          <input id="auth-password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} />
          {mode === "signup" && <><label htmlFor="auth-password-confirm">Confirme sua senha</label><input id="auth-password-confirm" type="password" autoComplete="new-password" required minLength={8} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} /></>}
          </fieldset>
          {error && <p id="auth-feedback" className="auth-message auth-message--error" role="alert">{error}</p>}
          {message && <p id="auth-feedback" className="auth-message" role="status">{message}</p>}
          <button className="discovery-button discovery-button--primary auth-submit" type="submit" disabled={busy}>{busy ? "Aguarde…" : mode === "signin" ? "Entrar" : "Criar conta"}</button>
        </form>
        <p className="auth-card__return"><Link className="auth-card__home" href="/"><ArrowLeft size={16} aria-hidden="true" /> Voltar à página inicial</Link></p>
      </section>
    </div>
  );
}