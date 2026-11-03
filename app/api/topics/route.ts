import { NextRequest, NextResponse } from "next/server";
import { authorizedSession, checkPremium, privateHeaders, topicsApiUrl } from "@/lib/server/topics-api";
import { sanitizePublicFeed } from "@/lib/topics";

export const dynamic = "force-dynamic";

function response(payload: unknown, status: number, authenticated: boolean) {
  return NextResponse.json(payload, {
    status,
    headers: {
      "Cache-Control": authenticated ? "private, no-store" : "public, max-age=0, s-maxage=60, stale-while-revalidate=30",
      Vary: "Cookie",
    },
  });
}

async function publicPreview() {
  const result = await fetch(topicsApiUrl("feed/topicsfree?limit=3&offset=0"), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!result.ok) throw new Error(`Public feed failed with ${result.status}`);
  return sanitizePublicFeed(await result.json());
}

export async function GET(request: NextRequest) {
  let session = null;
  try {
    session = await authorizedSession();
  } catch {
    return response({ error: "Autenticação indisponível." }, 503, false);
  }

  if (session && await checkPremium(session.accessToken)) {
    const query = request.nextUrl.searchParams;
    const search = query.get("q")?.trim();
    const requestedLimit = Number(query.get("limit") ?? (search ? 30 : 50));
    const requestedOffset = Number(query.get("offset") ?? 0);
    const maxLimit = search ? 30 : 50;
    if ((search && (search.length < 2 || search.length > 120)) ||
        !Number.isInteger(requestedLimit) || requestedLimit < 1 || requestedLimit > maxLimit ||
        !Number.isInteger(requestedOffset) || requestedOffset < 0 || requestedOffset > 10000) {
      return response({ error: "Parâmetros de busca ou paginação inválidos." }, 400, true);
    }

    const path = search
      ? `feed/topics/search?q=${encodeURIComponent(search)}&limit=${requestedLimit}&offset=${requestedOffset}`
      : `feed/topics?limit=${requestedLimit}&offset=${requestedOffset}`;

    try {
      const result = await fetch(topicsApiUrl(path), {
        headers: privateHeaders(session.accessToken),
        cache: "no-store",
      });
      if (result.ok) return response({ topics: await result.json(), access: "premium" }, 200, true);
      if (result.status !== 401 && result.status !== 403) {
        return response({ error: "Não foi possível carregar os tópicos." }, 502, true);
      }
      // The backend is authoritative: expired JWTs or lost entitlements fall back to preview.
    } catch {
      return response({ error: "Não foi possível conectar ao serviço de notícias." }, 502, true);
    }
  }

  try {
    return response({ topics: await publicPreview(), access: "preview" }, 200, Boolean(session));
  } catch {
    return response({ error: "Não foi possível carregar os tópicos." }, 503, Boolean(session));
  }
}