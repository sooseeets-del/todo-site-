"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/Toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [shakeKey, setShakeKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  function fail(msg: string) {
    setError(msg);
    setShakeKey((k) => k + 1);
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!email || !password) {
      fail("Email and password are required.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        const msg = data.error ?? "Login failed.";
        fail(msg);
        toast(msg, "error");
        return;
      }
      toast("Welcome back!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast("Network error. Try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[400px] px-6 py-16">
      <form
        onSubmit={submit}
        noValidate
        className="animate-rise card p-8"
      >
        <h1 className="font-display text-[24px] text-ink">Sign in</h1>
        <div
          key={shakeKey}
          className={shakeKey > 0 ? "animate-shake" : undefined}
        >
          <div className="mt-6 grid gap-4">
            <div>
              <label htmlFor="li-email" className="mb-1 block text-[15px] font-medium text-ink">
                Email
              </label>
              <input
                id="li-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="field"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="li-pass" className="mb-1 block text-[15px] font-medium text-ink">
                Password
              </label>
              <div className="relative">
                <input
                  id="li-pass"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="field pr-12"
                  placeholder="Your password"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-1 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-input text-muted transition-subtle hover:text-ink"
                >
                  {show ? <EyeOff size={18} strokeWidth={1.5} aria-hidden="true" /> : <Eye size={18} strokeWidth={1.5} aria-hidden="true" />}
                </button>
              </div>
            </div>
            {error && (
              <p role="alert" className="text-[15px] text-danger">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </div>
        <p className="mt-6 text-center text-[15px] text-muted">
          New here?{" "}
          <Link href="/signup" className="text-ink underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
