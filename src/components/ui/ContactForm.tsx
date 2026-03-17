"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    // TODO: Replace with your Zoho CRM web-to-lead endpoint
    // or a Next.js API route that forwards to Zoho
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          mobile: data.get("mobile"),
          email: data.get("email"),
          location: data.get("location"),
          message: data.get("message"),
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
      <div className="py-8 text-center">
        <div className="mb-4 text-4xl">&#10003;</div>
        <h3 className="text-xl font-bold">Thank you!</h3>
        <p className="mt-2 text-gray-600">
          We&apos;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
        />
      </div>

      <div>
        <label htmlFor="mobile" className="mb-1 block text-sm font-medium text-gray-700">
          Mobile Number *
        </label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          required
          pattern="[0-9]{10}"
          title="Please enter a 10-digit mobile number"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
        />
      </div>

      <div>
        <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700">
          Location / City
        </label>
        <input
          type="text"
          id="location"
          name="location"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-teal py-3 font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
