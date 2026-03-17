import type { Metadata } from "next";
import CalculatorForm from "@/components/ui/CalculatorForm";

export const metadata: Metadata = {
  title: "Requirement Calculator",
  description:
    "Calculate your painting material and labour requirements. Get a free quotation from Indicus Paints.",
};

export default function CalculatorPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-bold">Requirement Calculator</h1>
          <p className="mt-3 text-gray-300">
            Calculate painting material and labour requirements for your project
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Calculator Iframe */}
            <div className="lg:col-span-2">
              <div className="overflow-hidden rounded-xl border">
                <iframe
                  src="https://calculator.vncgroup.com/indicus"
                  title="Requirement Calculator"
                  className="h-[600px] w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Lead Capture */}
            <div>
              <div className="sticky top-24 rounded-2xl bg-gray-50 p-8">
                <h2 className="mb-2 text-xl font-bold">Get a Free Quote</h2>
                <p className="mb-6 text-sm text-gray-600">
                  Share your details and we&apos;ll get back with a detailed
                  quotation.
                </p>
                <CalculatorForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
