"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    email: "",
    password: "",
    selectedRole: "user", // default role
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect after successful sign-in based on session role
  useEffect(() => {
    if (status === "authenticated" && session?.user?.role) {
      const role = session.user.role;
      if (role === "admin") {
        router.push("/admin/upload-product");
      } else {
        router.push("/");
      }
    }
  }, [status, session, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    }
    // No redirect here; session update will trigger useEffect
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
          Sign In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="selectedRole"
              className="block mb-2 font-semibold text-gray-700"
            >
              Log in as
            </label>
            <select
              id="selectedRole"
              name="selectedRole"
              value={form.selectedRole}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold transition ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
