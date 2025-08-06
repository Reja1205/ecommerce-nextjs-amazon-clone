"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // default role
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Redirect to login after successful signup
      router.push("/auth/signin");
    } catch {
      setError("Failed to signup. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 font-semibold text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
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
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* ✅ Role Selection */}
          <fieldset className="space-y-2">
            <legend className="text-gray-700 font-semibold mb-1">
              Choose Role
            </legend>
            <div className="flex gap-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={form.role === "user"}
                  onChange={handleChange}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2 text-gray-700">User</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={form.role === "admin"}
                  onChange={handleChange}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2 text-gray-700">Admin</span>
              </label>
            </div>
          </fieldset>

          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md text-white font-semibold transition ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a
            href="/auth/signin"
            className="text-indigo-600 hover:underline font-semibold"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
