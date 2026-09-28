"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { MeUser } from "@/lib/types";
import { useToast } from "./Toast";
import Container from "./Container";

export default function Navbar() {
  const [user, setUser] = useState<MeUser | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setUser(d?.user ?? null))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function logout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      setUser(null);
      toast("Logged out.");
      router.push("/");
      router.refresh();
    } else {
      toast("Logout failed.", "error");
    }
  }

  const linkClass = (href: string) =>
    `min-h-[44px] content-center text-[15px] transition-subtle hover:text-ink ${
      pathname === href ? "text-ink underline underline-offset-8" : "text-muted"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200 ${
        scrolled
          ? "border-b border-border bg-bgTrans backdrop-blur-md"
          : "border-b border-transparent bg-transparent backdrop-blur-0"
      }`}
    >
      <Container>
        <nav aria-label="Main" className="flex h-16 items-center justify-between">
          <Link href="/" className="font-display text-[22px] text-ink">
            TaskFlow
          </Link>
          <div className="flex items-center gap-6">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  aria-current={pathname === "/dashboard" ? "page" : undefined}
                  className={linkClass("/dashboard")}
                >
                  Dashboard
                </Link>
                <button onClick={logout} className="btn btn-primary px-5 text-[15px]">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  aria-current={pathname === "/login" ? "page" : undefined}
                  className={linkClass("/login")}
                >
                  Sign in
                </Link>
                <Link href="/signup" className="btn btn-primary px-5 text-[15px]">
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}
