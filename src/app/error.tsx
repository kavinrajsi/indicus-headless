"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex min-h-[50vh] items-center justify-center py-20">
      <div className="container text-center">
        <h1 className="mb-4 text-2xl" style={{ fontFamily: "CeraPro-Bold" }}>
          Something went wrong
        </h1>
        <p className="mb-6 text-gray-500">{error.message || "An unexpected error occurred."}</p>
        <button onClick={reset} className="btn-fill">
          Try again
        </button>
      </div>
    </section>
  );
}
