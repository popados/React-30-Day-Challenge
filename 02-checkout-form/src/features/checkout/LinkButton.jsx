/**
 * A button that looks like a link, for in-flow actions such as "Change".
 * @param {object} props
 * @param {boolean} [props.inline] Sits inside a sentence, without the 44px target height.
 */
export function LinkButton({
  inline = false,
  className = '',
  type = 'button',
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`cursor-pointer bg-transparent font-medium text-link underline underline-offset-3 ${
        inline ? 'p-0' : 'min-h-target px-1'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
