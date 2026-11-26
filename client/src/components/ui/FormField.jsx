export default function FormField({ id, label, error, textarea = false, rows = 5, ...props }) {
  const Tag = textarea ? 'textarea' : 'input'

  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Tag
        id={id}
        rows={textarea ? rows : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`field ${error ? 'border-red-400' : ''} ${textarea ? 'resize-y' : ''}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}
