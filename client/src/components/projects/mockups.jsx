const bar = 'rounded bg-line/10'

/** Storefront layout used when a project has no screenshot. */
export function StoreMockup() {
  return (
    <div className="grid h-full grid-cols-3 gap-3 p-4">
      <div className="col-span-3 flex items-center justify-between">
        <div className={`${bar} h-3 w-20`} />
        <div className="flex gap-2">
          <div className={`${bar} h-3 w-8`} />
          <div className={`${bar} h-3 w-8`} />
        </div>
      </div>
      <div className="col-span-3 h-16 rounded-lg bg-accent/25" />
      {[0, 1, 2].map((index) => (
        <div key={index} className="space-y-2">
          <div className={`${bar} aspect-square`} />
          <div className={`${bar} h-2 w-3/4`} />
          <div className="h-2 w-1/3 rounded bg-accent/50" />
        </div>
      ))}
    </div>
  )
}

/** Admin dashboard layout for the second storefront screen. */
export function AdminMockup() {
  return (
    <div className="grid h-full grid-cols-[28%_1fr] gap-3 p-4">
      <div className="space-y-2">
        <div className="h-3 w-12 rounded bg-accent/50" />
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className={`${bar} h-2.5`} />
        ))}
      </div>
      <div className="space-y-2">
        {[0, 1, 2, 3, 4].map((index) => (
          <div key={index} className="flex gap-2">
            <div className={`${bar} h-4 w-4`} />
            <div className={`${bar} h-4 flex-1`} />
            <div className="h-4 w-8 rounded bg-accent/30" />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Generic application layout. */
export function AppMockup() {
  return (
    <div className="grid h-full place-items-center p-4">
      <div className="w-full max-w-[16rem] space-y-3">
        <div className="h-4 w-24 rounded bg-accent/50" />
        <div className={`${bar} h-10`} />
        <div className="grid grid-cols-2 gap-3">
          <div className={`${bar} h-14`} />
          <div className={`${bar} h-14`} />
        </div>
      </div>
    </div>
  )
}
