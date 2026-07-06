import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center desktop-background p-8 font-mono text-black">
      <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-sm text-gray-600 mb-6">
          Lost in Latent Space — this file does not exist.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 border-2 border-black text-sm hover:bg-black hover:text-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
