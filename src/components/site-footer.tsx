import Link from "next/link";

const PLAY_STORE_OPT_IN =
  "https://play.google.com/apps/testing/io.github.jpirt60.gearbag_tracker";

export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>
          © {new Date().getFullYear()} Gear Bag Tracker. Built by a veteran for
          softball players.
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
          <a
            href="mailto:jpirt60@gmail.com"
            className="hover:text-foreground transition-colors"
          >
            Contact
          </a>
          <a
            href={PLAY_STORE_OPT_IN}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Closed beta
          </a>
        </nav>
      </div>
    </footer>
  );
}
