import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isPremiumSubscription, sanitizePublicFeed } from "@/lib/topics";

export type AuthorizedSession = { accessToken: string; userId: string } | null;

export function topicsApiUrl(path: string): string {
  const base = process.env.SPECTRUM_API_URL;
  if (!base) throw new Error("SPECTRUM_API_URL não está configurada.");
  return new URL(path.replace(/^\//, ""), `${base.replace(/\/+$/, "")}/`).toString();
}

export async function authorizedSession(): Promise<AuthorizedSession> {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) return null;
  return { accessToken: session.access_token, userId: user.id };
}

export async function checkPremium(accessToken: string): Promise<boolean> {
  try {
    const response = await fetch(topicsApiUrl("auth/subscription"), {
      headers: { Authorization: `Bearer ${accessToken}`, Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) return false;
    return isPremiumSubscription(await response.json());
  } catch {
    return false;
  }
}

export async function publicPreviewContains(topicId: string): Promise<boolean> {
  const response = await fetch(topicsApiUrl("feed/topicsfree?limit=3&offset=0"), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Public feed failed with ${response.status}`);
  return sanitizePublicFeed(await response.json()).some((topic) => topic.id === topicId);
}

export function privateHeaders(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}`, Accept: "application/json" };
}