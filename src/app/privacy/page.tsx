import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Gear Bag Tracker",
  description: "Privacy policy for Gear Bag Tracker mobile app and web companion.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to home
        </Link>

        <h1 className="mt-8 text-4xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Effective date: May 19, 2026 · Last updated: May 19, 2026
        </p>

        <div className="mt-10 space-y-8 text-foreground leading-relaxed">
          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
            <p className="mt-3">
              Gear Bag Tracker ("we", "us", "the app") is a tool for softball
              players to track their gear. This policy explains what data we
              collect, how it&apos;s used, and your rights regarding it. The
              policy applies to both the Gear Bag Tracker Android app and the
              web companion at gearbagtracker.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              Information we collect
            </h2>
            <p className="mt-3">
              We collect the minimum data needed for the app to function:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <strong>Account information:</strong> your email address and a
                securely hashed password (handled by Supabase Auth). We never
                see or store your plaintext password.
              </li>
              <li>
                <strong>User-generated content:</strong> the gear items, notes,
                and related details you enter into the app.
              </li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> collect: location data, contacts, your
              device&apos;s photos or files, advertising identifiers,
              biometrics, or any data we don&apos;t need to run the app.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              How we use your information
            </h2>
            <p className="mt-3">
              Your data is used solely to operate the app: authenticating you,
              storing and displaying your gear list, and (in future releases)
              syncing it across your devices. We do not sell, rent, or share
              your data with advertisers. We do not use your data to train
              machine learning models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              Third parties we use
            </h2>
            <p className="mt-3">
              Gear Bag Tracker relies on a small number of infrastructure
              providers to operate:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>
                <strong>Supabase</strong> (database, authentication) —
                processes account credentials and user data on our behalf.
              </li>
              <li>
                <strong>Vercel</strong> (web hosting) — serves the web app at
                gearbagtracker.com.
              </li>
              <li>
                <strong>Google Play Services</strong> — distributes the
                Android app and handles in-app updates.
              </li>
            </ul>
            <p className="mt-3">
              These providers process data only to deliver their service to us.
              They do not have permission to use your data for their own
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              Data retention and deletion
            </h2>
            <p className="mt-3">
              We retain your account and gear data for as long as your account
              is active. You can request account deletion at any time by
              emailing the address below; we will permanently delete your
              account and associated data within 30 days of the request.
              Account deletion will also be available as an in-app feature in
              a future release.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Your rights</h2>
            <p className="mt-3">
              You can:
            </p>
            <ul className="mt-3 list-disc pl-6 space-y-2">
              <li>Access the data we hold about you (by logging in)</li>
              <li>Correct or delete individual gear items at any time</li>
              <li>Request a full data export by email</li>
              <li>Request full account deletion by email</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              Children&apos;s privacy
            </h2>
            <p className="mt-3">
              Gear Bag Tracker is not directed at children under 13. We do not
              knowingly collect data from children under 13. If you believe a
              child has provided us their information, please contact us and
              we will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Security</h2>
            <p className="mt-3">
              Data is encrypted in transit (HTTPS/TLS) and at rest through our
              database provider. Passwords are hashed using industry-standard
              algorithms by Supabase Auth. No system is perfectly secure, but
              we follow current best practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">
              Changes to this policy
            </h2>
            <p className="mt-3">
              If we make material changes to this policy, we will update the
              "Last updated" date above and notify active users by email or
              in-app message before the changes take effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
            <p className="mt-3">
              Questions about this policy or your data? Email{" "}
              <a
                href="mailto:jpirt60@gmail.com"
                className="font-medium underline underline-offset-4 hover:text-primary"
              >
                jpirt60@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
