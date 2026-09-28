import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col items-center justify-between gap-2 py-8 sm:flex-row">
        <Link href="/" className="font-display text-lg text-ink">
          TaskFlow
        </Link>
        <p className="text-[13px] text-muted">© 2026 TaskFlow. Plan calmly.</p>
      </Container>
    </footer>
  );
}
