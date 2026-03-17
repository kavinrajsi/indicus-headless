"use client";

import { useState, type FormEvent } from "react";

export default function CalculatorForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          mobile: data.get("mobile"),
          email: data.get("email") || "",
          location: data.get("pincode") || "",
          message: "Requirement Calculator - Quote Request",
        }),
      });

      if (res.ok) {
        setSuccess(true);
        form.reset();
      }
    } catch {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="py-6 text-center">
        <div className="mb-3 text-3xl text-teal">&#10003;</div>
        <h3 className="font-bold">Thank you!</h3>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ll send your quotation soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name *"
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none"
      />
      <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number *"
        required
        pattern="[0-9]{10}"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none"
      />
      <input
        type="email"
        name="email"
        placeholder="Email ID"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none"
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pin Code"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-teal py-3 font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Get Quote"}
      </button>
    </form>
  );
}
