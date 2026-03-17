import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center py-20">
      <div className="container mx-auto px-4 text-center lg:px-8">
        <div className="mx-auto max-w-md">
          <h1 className="mb-4 text-8xl font-black text-gray-200">404</h1>
          <h2 className="mb-4 text-2xl font-bold">Page Not Found</h2>
          <p className="mb-8 text-gray-600">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-teal px-6 py-3 font-medium text-white transition-colors hover:bg-teal-dark"
            >
              Go Home
            </Link>
            <Link
              href="/products"
              className="rounded-full border-2 border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:border-teal hover:text-teal"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
