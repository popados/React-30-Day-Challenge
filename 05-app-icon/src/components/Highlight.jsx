// See docs/design-system/components/Highlight.md.
// The only place Highlighter appears; never white text on it.
export function Highlight({ children }) {
  return (
    <mark className="rounded-sm bg-highlighter px-[0.15em] text-on-highlighter box-decoration-clone">
      {children}
    </mark>
  )
}
