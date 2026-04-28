export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <section className="section">
      <div className="container-px">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="eyebrow">Legal</span>
            <h1 className="mt-4 font-display text-3xl font-bold text-brand-950 sm:text-4xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-brand-700/70">Last updated: {updated}</p>
          </div>
          <article className="prose mt-10 max-w-none text-brand-900/85 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-brand-950 [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1 [&_a]:text-brand-700 [&_a]:underline">
            {children}
          </article>
        </div>
      </div>
    </section>
  );
}
