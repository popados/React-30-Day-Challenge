// Tempest Line Button: one primary action (lime in Blueprint) per screen;
// secondary is the default.
const BASE =
  'inline-flex min-h-control min-w-target cursor-pointer items-center justify-center gap-2 rounded-md border px-6 text-body-strong no-underline disabled:cursor-not-allowed disabled:opacity-55'

const VARIANTS = {
  primary: 'border-action bg-action text-on-action hover:border-action-hover hover:bg-action-hover',
  secondary: 'border-control-border bg-transparent text-ink hover:bg-surface-raised',
  // Lime in every theme, for actions that sit on a blueprint panel.
  highlight: 'border-highlighter bg-highlighter text-on-highlighter hover:brightness-105',
  // Provider buttons follow Google's and Apple's own branding, not Tempest Line tokens.
  google:
    'gap-[10px] border-[#747775] bg-white px-3 text-[#1f1f1f] dark:border-[#8e918f] dark:bg-[#131314] dark:text-[#e3e3e3]',
  apple: 'gap-0 border-black bg-white pr-4 pl-0 text-black dark:border-white',
}

/**
 * @param {object} props
 * @param {'primary'|'secondary'|'highlight'|'google'|'apple'} [props.variant]
 * @param {string} [props.href] Renders a link styled as a button instead of a <button>.
 * @param {boolean} [props.block] Full width of its container.
 * @param {React.ReactNode} [props.icon] A 20px <Icon>, or the official provider logo.
 */
export function Button({
  variant = 'secondary',
  block = false,
  icon,
  href,
  className = '',
  type = 'button',
  children,
  ...props
}) {
  const iconBox =
    variant === 'apple'
      ? 'inline-flex h-[46px] items-center [&_img]:h-full [&_img]:w-auto'
      : 'inline-flex size-5 items-center justify-center'

  const Element = href ? 'a' : 'button'

  return (
    <Element
      {...(href ? { href } : { type })}
      className={`${BASE} ${VARIANTS[variant]} ${block ? 'flex w-full' : ''} ${className}`}
      {...props}
    >
      {icon ? (
        <span className={iconBox} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </Element>
  )
}
