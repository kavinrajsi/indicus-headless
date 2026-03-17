"use client";

import { useState, type FormEvent } from "react";

interface ProductEntry {
  product: string;
  batchNumber: string;
  quantity: string;
}

export default function WarrantyActivationForm({
  productNames,
}: {
  productNames: string[];
}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [entries, setEntries] = useState<ProductEntry[]>([
    { product: "", batchNumber: "", quantity: "" },
  ]);

  const addEntry = () => {
    if (entries.length < 4) {
      setEntries([...entries, { product: "", batchNumber: "", quantity: "" }]);
    }
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: keyof ProductEntry, value: string) => {
    const updated = [...entries];
    updated[index][field] = value;
    setEntries(updated);
  };

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
          email: data.get("email"),
          location: data.get("pincode"),
          message: `Warranty Activation:\n${entries
            .filter((e) => e.product)
            .map(
              (e) =>
                `Product: ${e.product}, Batch: ${e.batchNumber}, Qty: ${e.quantity}`
            )
            .join("\n")}`,
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
        <div className="mb-4 text-4xl text-teal">&#10003;</div>
        <h3 className="text-xl font-bold">Warranty Activated!</h3>
        <p className="mt-2 text-gray-600">
          We&apos;ll send confirmation to your email.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Full Name *"
          required
          className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none"
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number *"
          required
          pattern="[0-9]{10}"
          className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none"
        />
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          className="rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-teal focus:outline-none"
        />
      </div>

      {/* Product Entries */}
      <div className="space-y-3 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-500">Product Details</h3>
        {entries.map((entry, i) => (
          <div key={i} className="flex gap-2">
            <select
              value={entry.product}
              onChange={(e) => updateEntry(i, "product", e.target.value)}
              required
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal focus:outline-none"
            >
              <option value="">Select Product</option>
              {productNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={entry.batchNumber}
              onChange={(e) => updateEntry(i, "batchNumber", e.target.value)}
              placeholder="Batch No."
              className="w-28 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal focus:outline-none"
            />
            <input
              type="number"
              value={entry.quantity}
              onChange={(e) => updateEntry(i, "quantity", e.target.value)}
              placeholder="Qty"
              min="1"
              className="w-20 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal focus:outline-none"
            />
            {entries.length > 1 && (
              <button
                type="button"
                onClick={() => removeEntry(i)}
                className="px-2 text-red-400 hover:text-red-600"
              >
                &times;
              </button>
            )}
          </div>
        ))}
        {entries.length < 4 && (
          <button
            type="button"
            onClick={addEntry}
            className="text-sm text-teal hover:underline"
          >
            + Add another product
          </button>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-teal py-3 font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Activate Warranty"}
      </button>
    </form>
  );
}
