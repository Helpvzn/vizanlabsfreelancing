"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Briefcase, Users } from "lucide-react";
import { signupAction, type AuthActionState } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const initialState: AuthActionState = {};

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signupAction, initialState);
  const [role, setRole] = useState<"client" | "freelancer">("client");

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create your free account</CardTitle>
        <CardDescription>
          Choose your role once — it cannot be changed later
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          {state.error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {state.error}
            </p>
          )}

          <div className="space-y-2">
            <Label>How will you use VizanLabs?</Label>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setRole("client")}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors",
                  role === "client"
                    ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-900">I want to hire</span>
                <span className="text-xs text-slate-500">Post projects and find freelancers</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("freelancer")}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors",
                  role === "freelancer"
                    ? "border-blue-600 bg-blue-50 ring-1 ring-blue-600"
                    : "border-slate-200 hover:border-slate-300"
                )}
              >
                <Briefcase className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-slate-900">I want to work</span>
                <span className="text-xs text-slate-500">Browse projects and submit proposals</span>
              </button>
            </div>
            <input type="hidden" name="role" value={role} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" name="firstName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" name="lastName" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" name="username" required placeholder="your_name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required autoComplete="email" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required autoComplete="new-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required autoComplete="new-password" />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating account..." : "Create free account"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
