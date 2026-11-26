export default function Section({ id, title, intro, children, className = '' }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`py-12 sm:py-16 ${className}`}>
      <div className="container-x">
        <div className="mb-8 max-w-2xl">
          <h2 id={`${id}-title`} className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
          {intro && <p className="mt-3 text-muted">{intro}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}
