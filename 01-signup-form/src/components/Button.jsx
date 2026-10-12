// See docs/design-system/components/Button.md.
// One primary per screen; secondary is the default.
const BASE =
  'inline-flex min-h-control min-w-target cursor-pointer items-center justify-center gap-2 rounded-md border px-4 text-label no-underline disabled:cursor-not-allowed disabled:opacity-55'

const VARIANTS = {
  primary: 'border-moss bg-moss text-on-moss hover:brightness-92',
  secondary: 'border-rule bg-paper text-ink hover:bg-paper-deep',
  // Provider buttons follow Google's and Apple's own branding, not Fieldnote tokens.
  google:
    'gap-[10px] border-[#747775] bg-white px-3 text-[#1f1f1f] dark:border-[#8e918f] dark:bg-[#131314] dark:text-[#e3e3e3]',
  apple: 'gap-0 border-black bg-white pr-4 pl-0 text-black dark:border-white',
}

/**
 * @param {object} props
 * @param {'primary'|'secondary'|'google'|'apple'} [props.variant]
 * @param {boolean} [props.block] Full width of its container.
 * @param {React.ReactNode} [props.icon] A 20px <Icon>, or the official provider logo.
 */
export function Button({
  variant = 'secondary',
  block = false,
  icon,
  className = '',
  type = 'button',
  children,
  ...props
}) {
  const iconBox =
    variant === 'apple'
      ? 'inline-flex h-[46px] items-center [&_img]:h-full [&_img]:w-auto'
      : 'inline-flex size-5 items-center justify-center'

  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTS[variant]} ${block ? 'flex w-full' : ''} ${className}`}
      {...props}
    >
      {icon ? (
        <span className={iconBox} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {children}
    </button>
  )
}
