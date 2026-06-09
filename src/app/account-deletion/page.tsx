export const metadata = {
  title: "Account Deletion | Gear Bag Tracker",
  description: "How to delete your Gear Bag Tracker account and associated data.",
};

export default function AccountDeletionPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">Account and Data Deletion</h1>

      <p className="mb-6">
        Gear Bag Tracker (developed by Jaron Pirtle) allows you to permanently
        delete your account and all associated data at any time.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">
        How to delete your account
      </h2>

      <h3 className="text-lg font-medium mt-6 mb-2">From the mobile app</h3>
      <ol className="list-decimal pl-6 space-y-2 mb-6">
        <li>Open the Gear Bag Tracker app and sign in.</li>
        <li>Tap the settings icon in the top right of the home screen.</li>
        <li>
          Tap <strong>Delete my account</strong>.
        </li>
        <li>
          Type <strong>DELETE</strong> in the confirmation dialog and confirm.
        </li>
      </ol>

      <h3 className="text-lg font-medium mt-6 mb-2">From the web app</h3>
      <ol className="list-decimal pl-6 space-y-2 mb-6">
        <li>
          Sign in at{" "}
          
            href="https://gearbagtracker.com"
            className="text-blue-600 underline"
          >
            gearbagtracker.com
          </a>
          .
        </li>
        <li>
          Click <strong>Settings</strong> in the top navigation.
        </li>
        <li>
          Click <strong>Delete my account</strong>.
        </li>
        <li>
          Type <strong>DELETE</strong> in the confirmation dialog and confirm.
        </li>
      </ol>

      <h3 className="text-lg font-medium mt-6 mb-2">
        If you cannot access either app
      </h3>
      <p className="mb-6">
        Email <strong>jpirt60@gmail.com</strong> from the email address
        associated with your account and request account deletion. Requests
        will be processed within 30 days.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">What gets deleted</h2>
      <p className="mb-4">
        When you delete your account, the following is permanently removed:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>Your account and login credentials</li>
        <li>Your email address</li>
        <li>All gear items you have added</li>
        <li>All usage notes you have created</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-4">What is retained</h2>
      <p className="mb-6">
        Nothing. Account deletion is immediate and complete. No personal data
        is retained after deletion. Anonymized server logs (which contain no
        personally identifying information) may be retained for up to 30 days
        for security and operational purposes.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-4">Contact</h2>
      <p>
        Questions about account deletion can be sent to{" "}
        <strong>jpirt60@gmail.com</strong>.
      </p>
    </div>
  );
}