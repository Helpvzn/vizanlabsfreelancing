export const runtime = 'edge';
import { getCurrentProfile } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">Your Profile</h1>
      <p className="mt-2 text-slate-600 capitalize">Role: {profile.role} (fixed at signup)</p>
      <dl className="mt-6 space-y-3 rounded-xl border border-slate-200 p-6 text-sm">
        <div><dt className="text-slate-500">Name</dt><dd className="font-medium">{profile.first_name} {profile.last_name}</dd></div>
        <div><dt className="text-slate-500">Username</dt><dd className="font-medium">@{profile.username}</dd></div>
        <div><dt className="text-slate-500">Email</dt><dd className="font-medium">{profile.email}</dd></div>
        <div><dt className="text-slate-500">Phone</dt><dd className="font-medium">{profile.phone ?? "Not set — add in Phase 2"}</dd></div>
      </dl>
    </div>
  );
}
