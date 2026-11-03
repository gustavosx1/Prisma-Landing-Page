"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

function safeReturnTo(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/topicos";
}

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

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
      const text = reason instanceof Error ? reason.message : "Não foi possível autenticar.";
      setError(text.includes("Invalid login credentials") ? "E-mail ou senha incorretos." : text);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-layout">
      <aside className="auth-story">
        <Image className="auth-story__logo" src="/logo.svg" alt="Prisma News" width={300} height={300} priority />
        <p className="auth-story__eyebrow">PRISMA NEWS · LEITURA EM CONTEXTO</p>
        <h2>O mundo não cabe em uma manchete.</h2>
        <p>Entre para explorar os acontecimentos por diferentes perspectivas e descobrir o que cada cobertura deixa em evidência.</p>
        <div className="auth-story__spectrum" aria-label="Perspectivas: esquerda, centro e direita"><i /><i /><i /></div>
        <small>Esquerda <span>·</span> Centro <span>·</span> Direita</small>
      </aside>
      <section className="auth-card" aria-labelledby="auth-title">
        <p className="discovery-eyebrow">Sua leitura, do seu jeito</p>
        <h1 id="auth-title">{mode === "signin" ? "Boas-vindas de volta" : "Crie sua conta Prisma"}</h1>
        <p className="auth-card__intro">Entre ou crie sua conta gratuita para continuar. O Premium é verificado separadamente e só pode ser assinado no aplicativo.</p>
        <div className="auth-tabs" role="group" aria-label="Tipo de acesso">
          <button type="button" aria-pressed={mode === "signin"} onClick={() => { setMode("signin"); setError(""); setMessage(""); }}>Entrar</button>
          <button type="button" aria-pressed={mode === "signup"} onClick={() => { setMode("signup"); setError(""); setMessage(""); }}>Criar conta</button>
        </div>
        <form className="auth-form" onSubmit={submit}>
          <label htmlFor="auth-email">E-mail</label>
          <input id="auth-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="auth-password">Senha</label>
          <input id="auth-password" type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} />
          {mode === "signup" && <><label htmlFor="auth-password-confirm">Confirme sua senha</label><input id="auth-password-confirm" type="password" autoComplete="new-password" required minLength={8} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} /></>}
          {error && <p className="auth-message auth-message--error" role="alert">{error}</p>}
          {message && <p className="auth-message" role="status">{message}</p>}
          <button className="discovery-button discovery-button--primary auth-submit" type="submit" disabled={busy}>{busy ? "Aguarde…" : mode === "signin" ? "Entrar" : "Criar conta"}</button>
        </form>
        <p className="auth-card__return">Depois de entrar, você volta para <Link href={returnTo}>a página que abriu este acesso</Link>.</p>
      </section>
    </div>
  );
}