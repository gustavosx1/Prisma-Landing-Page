import { NextResponse } from "next/server";
import { authorizedSession, checkPremium, privateHeaders, publicPreviewContains, topicsApiUrl } from "@/lib/server/topics-api";
import { sanitizePublicDetail } from "@/lib/topics";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ topicId: string }> };

function json(payload: unknown, status: number, authenticated: boolean) {
  return NextResponse.json(payload, {
    status,
    headers: { "Cache-Control": authenticated ? "private, no-store" : "public, max-age=0, s-maxage=60, stale-while-revalidate=30", Vary: "Cookie" },
  });
}

export async function GET(_request: Request, context: Context) {
  const { topicId } = await context.params;
  if (!/^[\w-]{1,160}$/.test(topicId)) return json({ error: "Tópico inválido." }, 400, false);

  let session = null;
  try {
    session = await authorizedSession();
  } catch {
    return json({ error: "Autenticação indisponível." }, 503, false);
  }

  if (session && await checkPremium(session.accessToken)) {
    try {
      const result = await fetch(topicsApiUrl(`feed/topics/${encodeURIComponent(topicId)}`), {
        headers: privateHeaders(session.accessToken),
        cache: "no-store",
      });
      if (result.ok) return json({ topic: await result.json(), access: "premium" }, 200, true);
      if (result.status === 404) return json({ error: "Tópico não encontrado." }, 404, true);
      if (result.status !== 401 && result.status !== 403) return json({ error: "Não foi possível carregar o tópico." }, 502, true);
    } catch {
      return json({ error: "Não foi possível conectar ao serviço de notícias." }, 502, true);
    }
  }

  try {
    if (!await publicPreviewContains(topicId)) return json({ error: "Tópico não encontrado." }, 404, Boolean(session));
    const result = await fetch(topicsApiUrl(`feed/topicsfree/${encodeURIComponent(topicId)}`), {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (result.status === 404) return json({ error: "Tópico não encontrado." }, 404, Boolean(session));
    if (!result.ok) return json({ error: "Não foi possível carregar o tópico." }, 502, Boolean(session));
    const topic = sanitizePublicDetail(await result.json());
    return topic ? json({ topic, access: "preview" }, 200, Boolean(session)) : json({ error: "Formato de tópico indisponível." }, 502, Boolean(session));
  } catch {
    return json({ error: "Não foi possível conectar ao serviço de notícias." }, 503, Boolean(session));
  }
}