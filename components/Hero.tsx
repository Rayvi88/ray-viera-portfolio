import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex-1 flex items-center px-4 sm:px-10 lg:px-20">
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          Designing complex
          <br />
          systems with <span className="text-[#00C3D0]">clarity</span>
        </h1>

        <p className="mt-4 lg:mt-6 text-sm sm:text-base text-gray-600">
          I help teams launch and scale products with clarity and purpose.
        </p>

        <div className="mt-6 lg:mt-8 flex gap-3 lg:gap-4">
          <Link
            href="/contact"
            className="border border-black rounded-full px-5 sm:px-6 py-2 text-sm sm:text-base hover:bg-[#00C3D0] hover:text-white hover:border-[#00C3D0] transition"
          >
            Contact me
          </Link>

          <Link
            href="/selected-works"
            className="border border-black rounded-full px-5 sm:px-6 py-2 text-sm sm:text-base hover:bg-[#00C3D0] hover:text-white hover:border-[#00C3D0] transition"
          >
            Selected works
          </Link>
        </div>
      </div>
    </section>
  );
}