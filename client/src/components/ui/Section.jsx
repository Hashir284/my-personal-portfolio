/**
 * Consistent section shell: numbered eyebrow, headline, intro and an
 * optional aside for actions on the right.
 */
export default function Section({ id, eyebrow, title, intro, aside, children, className = '' }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`relative py-8 sm:py-8 ${className}`}>
      <div className="container-x">
        <header className="mb-8 flex flex-col gap-6 sm:mb-[34px] lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="eyebrow mb-4">
                <span aria-hidden className="h-px w-6 bg-accent" />
                {eyebrow}
              </p>
            )}
            <h2
              id={`${id}-title`}
              className="text-balance text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[2.6rem]"
            >
              {title}
            </h2>
            {intro && <p className="mt-4 text-pretty leading-relaxed text-muted sm:text-lg">{intro}</p>}
          </div>
          {aside}
        </header>
        {children}
      </div>
    </section>
  )
}
