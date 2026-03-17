"use client";

import { useState, type FormEvent } from "react";

export default function CallbackForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          mobile: data.get("mobile"),
          email: "",
          location: data.get("pincode"),
          message: "Callback request from homepage",
        }),
      });
      if (res.ok) setSuccess(true);
    } catch { /* silent */ } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-14">
      <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
        <h2 className="text-2xl font-black uppercase">Request a Call Back</h2>
        <p className="mt-2 text-sm text-gray-500">
          We will be happy to be of assistance.
        </p>

        {success ? (
          <div className="mt-8 rounded-xl bg-green-50 p-6 text-green-700">
            Thank you! We&apos;ll call you back shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-purple focus:outline-none"
            />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile number"
              required
              pattern="[0-9]{10}"
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-purple focus:outline-none"
            />
            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-purple focus:outline-none sm:w-32"
            />
            <button type="submit" disabled={loading} className="btn-purple whitespace-nowrap uppercase">
              {loading ? "..." : "Submit"}
            </button>
          </form>
        )}

        <p className="mt-3 text-[11px] text-gray-400">
          By proceeding, you are authorising Indicus and its contractors to get
          in touch with you through calls, messages or e-mails.
        </p>
      </div>
    </section>
  );
}
