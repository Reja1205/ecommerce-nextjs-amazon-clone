"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading profile...</p>;
  }

  if (!session) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>

      <p>
        <strong>Name:</strong> {session.user?.name || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {session.user?.email}
      </p>
      <p>
        <strong>Role:</strong> {session.user?.role || "user"}
      </p>
    </div>
  );
}
