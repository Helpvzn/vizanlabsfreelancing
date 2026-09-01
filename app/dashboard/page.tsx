export const runtime = 'edge';
import Link from "next/link";
import { getCurrentProfile } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonClassName } from "@/components/ui/button";

export default async function DashboardPage() {
  const profile = await getCurrentProfile();
  if (!profile) redirect("/login");

  const isClient = profile.role === "client";
  const isFreelancer = profile.role === "freelancer";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome, {profile.first_name ?? profile.username ?? "there"}
        </h1>
        <p className="mt-1 text-slate-600 capitalize">
          {profile.role} dashboard — everything is free on VizanLabs
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isClient && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Post a Project</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Share your project and receive proposals.</p>
                <Link href="/dashboard/projects/new" className={buttonClassName("default", "sm", "mt-4 inline-flex")}>
                  Post New Project
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>My Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Manage drafts, open, and completed projects.</p>
                <Link href="/dashboard/projects" className={buttonClassName("outline", "sm", "mt-4 inline-flex")}>
                  View Projects
                </Link>
              </CardContent>
            </Card>
          </>
        )}

        {isFreelancer && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Find Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Browse open projects and submit proposals.</p>
                <Link href="/projects" className={buttonClassName("default", "sm", "mt-4 inline-flex")}>
                  Browse Projects
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>My Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600">Track submitted and accepted proposals.</p>
                <Link href="/dashboard/proposals" className={buttonClassName("outline", "sm", "mt-4 inline-flex")}>
                  View Proposals
                </Link>
              </CardContent>
            </Card>
          </>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">Chat with clients or freelancers. Share contact when deal is done.</p>
            <Link href="/messages" className={buttonClassName("outline", "sm", "mt-4 inline-flex")}>
              Open Messages
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">Update bio, skills, and phone number.</p>
            <Link href="/profile" className={buttonClassName("outline", "sm", "mt-4 inline-flex")}>
              Edit Profile
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
