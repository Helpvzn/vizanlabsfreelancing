"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Briefcase, Users } from "lucide-react";
import { signupAction, type AuthActionState } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SignupForm() {
  const [role, setRole] = useState<"client" | "freelancer">("client");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep field values so they don't clear on error
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData();
    formData.append("role", role);
    formData.append("firstName", fields.firstName);
    formData.append("lastName", fields.lastName);
    formData.append("username", fields.username);
    formData.append("email", fields.email);
    formData.append("password", fields.password);
    formData.append("confirmPassword", fields.confirmPassword);

    try {
      const result: AuthActionState = await signupAction({}, formData);
      if (result?.error) {
        setError(result.error);
      }
      // If no error & no return → server redirected (success)
    } catch {
      // redirect() throws — that means success, do nothing
    } finally {
      setPending(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create your free account</CardTitle>
        <CardDescription>
          Choose your role once — it cannot be changed later
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
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
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                required
                value={fields.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                required
                value={fields.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              required
              placeholder="your_name"
              value={fields.username}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={fields.email}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                value={fields.password}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                autoComplete="new-password"
                value={fields.confirmPassword}
                onChange={handleChange}
              />
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
