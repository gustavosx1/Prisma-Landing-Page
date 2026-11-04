import { NextResponse } from "next/server";
import { authorizedSession, privateHeaders, topicsApiUrl } from "@/lib/server/topics-api";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await authorizedSession();
    if (!session) return NextResponse.json({ error: "Sessão inválida." }, { status: 401, headers: { "Cache-Control": "private, no-store" } });
    const upstream = await fetch(topicsApiUrl("auth/me"), { headers: privateHeaders(session.accessToken), cache: "no-store" });
    return NextResponse.json(await upstream.json(), { status: upstream.status, headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Não foi possível validar a conta." }, { status: 503, headers: { "Cache-Control": "private, no-store" } });
  }
}