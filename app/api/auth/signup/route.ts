import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { authCookie, signToken } from "@/lib/auth";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name?.trim())
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    if (!email || !isEmail(email))
      return NextResponse.json(
        { error: "Enter a valid email address." },
        { status: 400 }
      );
    if (!password || password.length < 6)
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );

    const db = supabaseAdmin();
    const cleanEmail = email.toLowerCase().trim();

    const { data: exists } = await db
      .from("taskflow_users")
      .select("id")
      .eq("email", cleanEmail)
      .maybeSingle();
    if (exists)
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );

    const password_hash = await bcrypt.hash(password, 10);
    const { data: user, error } = await db
      .from("taskflow_users")
      .insert({ name: name.trim(), email: cleanEmail, password_hash })
      .select("id, name, email")
      .single();
    if (error || !user) throw error;

    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    const res = NextResponse.json(
      { user: { id: user.id, name: user.name, email: user.email } },
      { status: 201 }
    );
    const c = authCookie(token);
    res.cookies.set(c.name, c.value, {
      httpOnly: c.httpOnly,
      secure: c.secure,
      sameSite: c.sameSite,
      path: c.path,
      maxAge: c.maxAge,
    });
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not create account. Try again." },
      { status: 500 }
    );
  }
}
