import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthForm } from "@/components/discovery/AuthForm";
import { authorizedSession } from "@/lib/server/topics-api";
import { redirect } from "next/navigation";
import { safeReturnTo } from "@/lib/safeReturnTo";

export const metadata: Metadata = { title: "Entrar ou criar conta", robots: { index: false, follow: false } };

type Props = { searchParams: Promise<{ returnTo?: string }> };

export default async function AccountPage({ searchParams }: Props) {
  const [{ returnTo }, session] = await Promise.all([searchParams, authorizedSession().catch(() => null)]);
  if (session) redirect(safeReturnTo(returnTo));

  return <main className="auth-page"><Suspense fallback={<p className="discovery-state">Carregando…</p>}><AuthForm /></Suspense></main>;
}