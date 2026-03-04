import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AuthCallbackPage({ searchParams }: Props) {
  const params = await searchParams;
  const codeParam = params.code;

  const code = Array.isArray(codeParam) ? codeParam[0] : codeParam;

  // If no code, send to login
  if (!code) {
    redirect("/login");
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  // ✅ Your version expects the code argument
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    redirect("/login");
  }

  redirect("/dashboard");
}
