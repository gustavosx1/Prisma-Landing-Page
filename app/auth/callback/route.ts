import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function safeReturnTo(value: string | null): string {
  return value?.startsWith("/") && !value.startsWith("//") && !value.includes("\\") ? value : "/topicos";
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const destination = safeReturnTo(request.nextUrl.searchParams.get("returnTo"));
  if (code) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(new URL(destination, request.url));
}