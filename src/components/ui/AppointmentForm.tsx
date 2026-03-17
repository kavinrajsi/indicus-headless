"use client";

import { useState, type FormEvent } from "react";

export default function AppointmentForm() {
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
          email: "",
          location: data.get("pincode"),
          message: "ColourCraft painting service appointment request",
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
        <h3 className="text-lg font-bold">Thank you!</h3>
        <p className="mt-2 text-sm text-white/70">
          Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name *"
        required
        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
      />
      <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number *"
        required
        pattern="[0-9]{10}"
        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
      />
      <input
        type="text"
        name="pincode"
        placeholder="Pincode"
        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-white py-3 font-medium text-purple-900 transition-colors hover:bg-gray-100 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Book Free Inspection"}
      </button>
    </form>
  );
}
