const VARIANTS = {
  primary: 'btn btn-primary',
  ghost: 'btn btn-ghost',
  quiet: 'btn btn-quiet',
}

/** Renders an anchor when `href` is given, otherwise a button. */
export default function Button({ href, variant = 'primary', className = '', children, ...rest }) {
  const Tag = href ? 'a' : 'button'
  const classes = `${VARIANTS[variant] || VARIANTS.primary} ${className}`

  return (
    <Tag href={href} className={classes} {...rest}>
      {children}
    </Tag>
  )
}
