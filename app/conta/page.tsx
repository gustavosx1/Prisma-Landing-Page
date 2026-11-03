import type { Metadata } from "next";
import { Suspense } from "react";
import { DiscoveryHeader } from "@/components/discovery/DiscoveryHeader";
import { AuthForm } from "@/components/discovery/AuthForm";

export const metadata: Metadata = { title: "Entrar ou criar conta", robots: { index: false, follow: false } };

export default function AccountPage() {
  return <><DiscoveryHeader /><main className="auth-page"><Suspense fallback={<p className="discovery-state">Carregando…</p>}><AuthForm /></Suspense></main></>;
}