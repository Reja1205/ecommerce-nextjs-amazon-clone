"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <p>Loading session...</p>;

  if (!session) return <p>Please log in.</p>;

  // Debug session to confirm role
  console.log("Session user role:", session.user.role);

  if (session.user.role !== "admin") {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Welcome Admin</h1>

      {/* Debug session JSON */}
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <button
        onClick={() => router.push("/admin/upload-product")}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload a Product
      </button>
    </div>
  );
}
