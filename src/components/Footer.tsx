"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <footer className="bg-gray-900 text-white px-6 py-8 text-sm">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top footer: links and about button */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</p>

          <div className="flex space-x-4">
            <Link href="/terms" className="hover:underline text-gray-300">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline text-gray-300">
              Privacy
            </Link>
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="text-blue-400 underline hover:text-blue-300"
            >
              About
            </button>
          </div>
        </div>

        {/* About collapsible content */}
        {showAbout && (
          <div className="bg-gray-800 p-6 rounded-lg text-left space-y-4 max-h-[75vh] overflow-y-auto border border-gray-700">
            <h3 className="text-lg font-semibold">✅ About This Project</h3>
            <p>
              From concept to code, this e-commerce project is a self-built,
              full-stack Amazon-style platform developed using{" "}
              <strong>Next.js 14 App Router</strong>, <strong>MongoDB</strong>,{" "}
              <strong>Tailwind CSS</strong>, and <strong>TypeScript</strong>.
            </p>

            <h4 className="font-semibold">
              🚀 Epic: Build a Full-Stack E-Commerce Platform
            </h4>
            <p>
              This epic represents the entire product lifecycle, from user
              browsing to checkout and order management.
            </p>

            <h4 className="font-semibold">🎯 Features Completed</h4>
            <ul className="list-disc ml-5 space-y-1">
              <li>
                <strong>🏠 Home & Product Display</strong>
                <ul className="list-disc ml-5">
                  <li>Display products dynamically from MongoDB</li>
                  <li>Server-side API route connected to Product model</li>
                </ul>
              </li>

              <li>
                <strong>🛒 Cart & Checkout Flow</strong>
                <ul className="list-disc ml-5">
                  <li>Cart functionality with item add/remove/update</li>
                  <li>Persistent cart using localStorage</li>
                  <li>Checkout page with shipping form</li>
                  <li>Order saved to MongoDB on submission</li>
                </ul>
              </li>

              <li>
                <strong>👥 Authentication</strong>
                <ul className="list-disc ml-5">
                  <li>NextAuth.js with CredentialsProvider (MongoDB)</li>
                  <li>Login/logout functionality</li>
                  <li>Session used to associate users with orders</li>
                </ul>
              </li>

              <li>
                <strong>📦 Order Management</strong>
                <ul className="list-disc ml-5">
                  <li>Orders stored with user email + shipping info</li>
                  <li>Confirmation page displays submitted data</li>
                  <li>Auto-generated estimated delivery date</li>
                  <li>
                    Order history shown on <code>/orders</code>
                  </li>
                </ul>
              </li>

              <li>
                <strong>📧 Email Confirmation (via Resend)</strong>
                <ul className="list-disc ml-5">
                  <li>Email sent on successful checkout</li>
                  <li>Includes order ID, total, and delivery estimate</li>
                  <li>Verified receipt in Gmail inbox</li>
                </ul>
              </li>
            </ul>

            <h4 className="font-semibold">🧪 User Stories (Implemented)</h4>
            <ul className="list-disc ml-5">
              <li>As a visitor, I can browse a homepage and see products.</li>
              <li>
                As a customer, I can add items to a cart, adjust them, and place
                an order.
              </li>
              <li>As a logged-in user, I can view my past orders.</li>
              <li>As a user, I receive an order confirmation email.</li>
            </ul>

            <h4 className="font-semibold">🛠️ Technical Tasks Completed</h4>
            <ul className="list-disc ml-5">
              <li>Setup Next.js 14 App Router structure</li>
              <li>Integrated Mongoose with MongoDB</li>
              <li>
                Built secure API routes (<code>/api/products</code>,{" "}
                <code>/api/orders</code>)
              </li>
              <li>
                Configured <code>.env.local</code> and environment variables
              </li>
              <li>
                Protected routes using <code>getServerSession</code>
              </li>
              <li>Integrated Resend for email confirmation</li>
              <li>Fixed ESLint + TypeScript strict typing issues</li>
            </ul>
          </div>
        )}
      </div>
    </footer>
  );
}
