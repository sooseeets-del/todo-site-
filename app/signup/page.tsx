"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/components/Toast";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shakeKey, setShakeKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email address.";
    if (password.length < 6)
      e.password = "Password must be at least 6 characters.";
    setErrors(e);
    if (Object.keys(e).length > 0) setShakeKey((k) => k + 1);
    return Object.keys(e).length === 0;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.error ?? "Signup failed.", "error");
        setShakeKey((k) => k + 1);
        return;
      }
      toast("Account created. Welcome!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast("Network error. Try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  const label = "mb-1 block text-[15px] font-medium text-ink";
  const err = (key: string) =>
    errors[key] ? (
      <p role="alert" className="mt-1 text-[15px] text-danger">
        {errors[key]}
      </p>
    ) : null;

  return (
    <div className="mx-auto w-full max-w-[400px] px-6 py-16">
      <form
        onSubmit={submit}
        noValidate
        className="animate-rise card p-8"
      >
        <h1 className="font-display text-[24px] text-ink">Create your account</h1>
        <div
          key={shakeKey}
          className={shakeKey > 0 ? "animate-shake" : undefined}
        >
          <div className="mt-6 grid gap-4">
            <div>
              <label htmlFor="su-name" className={label}>
                Name
              </label>
              <input
                id="su-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="field"
                placeholder="Your name"
              />
              {err("name")}
            </div>
            <div>
              <label htmlFor="su-email" className={label}>
                Email
              </label>
              <input
                id="su-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="field"
                placeholder="you@example.com"
              />
              {err("email")}
            </div>
            <div>
              <label htmlFor="su-pass" className={label}>
                Password
              </label>
              <div className="relative">
                <input
                  id="su-pass"
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className="field pr-12"
                  placeholder="At least 6 characters"
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
              {err("password")}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full disabled:opacity-60"
            >
              {loading ? "Creating…" : "Sign up"}
            </button>
          </div>
        </div>
        <p className="mt-6 text-center text-[15px] text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-ink underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
