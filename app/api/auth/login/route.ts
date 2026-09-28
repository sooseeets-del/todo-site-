import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/lib/supabase";
import { authCookie, signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );

    const db = supabaseAdmin();
    const { data: user } = await db
      .from("taskflow_users")
      .select("id, name, email, password_hash")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();
    if (!user)
      return NextResponse.json(
        { error: "No account found with this email." },
        { status: 401 }
      );

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok)
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 }
      );

    const token = signToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    const res = NextResponse.json({
      user: { id: user.id, name: user.name, email: user.email },
    });
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
      { error: "Could not log in. Try again." },
      { status: 500 }
    );
  }
}
