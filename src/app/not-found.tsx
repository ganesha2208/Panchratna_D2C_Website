import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-px mx-auto max-w-md text-center">
        <div className="font-display text-7xl font-bold text-brand-600">404</div>
        <h1 className="mt-4 font-display text-2xl font-bold text-brand-950">
          Page not found
        </h1>
        <p className="mt-3 text-brand-900/70">
          The page you were looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="btn-primary btn-md mt-8">
          Back to home
        </Link>
      </div>
    </section>
  );
}
