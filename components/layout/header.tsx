import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/lib/auth/actions";
import { Button, buttonClassName } from "@/components/ui/button";
import type { Profile } from "@/lib/supabase/database.types";

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: Profile | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    profile = data as Profile | null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm text-white">
            V
          </span>
          VizanLabs
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/projects" className="text-sm text-slate-600 hover:text-slate-900">
            Find Projects
          </Link>
          <Link href="/freelancers" className="text-sm text-slate-600 hover:text-slate-900">
            Find Freelancers
          </Link>
          <Link href="/#how-it-works" className="text-sm text-slate-600 hover:text-slate-900">
            How It Works
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user && profile ? (
            <>
              <Link href="/dashboard" className="hidden text-sm text-slate-600 hover:text-slate-900 sm:block">
                Dashboard
              </Link>
              <Link href="/messages" className="hidden text-sm text-slate-600 hover:text-slate-900 sm:block">
                Messages
              </Link>
              <span className="hidden rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-600 sm:inline">
                {profile.role}
              </span>
              <form action={logoutAction}>
                <Button type="submit" variant="outline" size="sm">
                  Logout
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className={buttonClassName("ghost", "sm")}>
                Login
              </Link>
              <Link href="/signup" className={buttonClassName("default", "sm")}>
                Sign Up Free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
