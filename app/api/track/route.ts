import { createClient } from "@supabase/supabase-js";

type EventType = "visit" | "download_click";

type TrackBody = {
  type: EventType;
  visitor_id: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  store: "play" | "appstore" | null;
};

const BOT_USER_AGENT = /bot|crawler|spider|preview|facebookexternalhit/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function truncate(value: unknown, maxLength = 100): string | null {
  return typeof value === "string" ? value.slice(0, maxLength) : null;
}

export async function POST(request: Request): Promise<Response> {
  const userAgent = request.headers.get("user-agent") ?? "";

  if (BOT_USER_AGENT.test(userAgent)) {
    return Response.json({ ok: true, skipped: true });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isRecord(body)) {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (body.type !== "visit" && body.type !== "download_click") {
    return Response.json({ error: "Invalid event type" }, { status: 400 });
  }

  const visitorId = truncate(body.visitor_id);
  if (!visitorId) {
    return Response.json({ error: "visitor_id is required" }, { status: 400 });
  }

  const event: TrackBody = {
    type: body.type,
    visitor_id: visitorId,
    utm_source: truncate(body.utm_source),
    utm_medium: truncate(body.utm_medium),
    utm_campaign: truncate(body.utm_campaign),
    utm_content: truncate(body.utm_content),
    store: body.store === "play" || body.store === "appstore" ? body.store : null,
  };

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Tracking is missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    return Response.json({ error: "Tracking is not configured" }, { status: 500 });
  }

  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { error } = await supabase.from("events").insert({
      ...event,
      user_agent: userAgent.slice(0, 300) || null,
      country: truncate(request.headers.get("x-vercel-ip-country")),
    });

    if (error) {
      console.error("Failed to insert tracking event", error);
      return Response.json({ error: "Failed to record event" }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error("Failed to insert tracking event", error);
    return Response.json({ error: "Failed to record event" }, { status: 500 });
  }

  return Response.json({ ok: true });
}