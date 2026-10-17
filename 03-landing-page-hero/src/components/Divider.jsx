// See docs/design-system/components/Divider.md. Keep the word lowercase.
export function Divider({ children = 'or' }) {
  return (
    <div
      role="separator"
      className="flex items-center gap-3 text-caption text-graphite before:h-px before:flex-1 before:bg-hairline after:h-px after:flex-1 after:bg-hairline"
    >
      {children}
    </div>
  )
}
