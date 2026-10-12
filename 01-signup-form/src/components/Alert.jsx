import { Icon } from '@/components/Icon'

// See docs/design-system/components/Alert.md. Every tone pairs an icon with words.
const TONES = {
  error: { icon: 'circle-alert', box: 'bg-error-soft', iconColor: 'text-error', role: 'alert' },
  info: { icon: 'info', box: 'bg-moss-soft', iconColor: 'text-moss', role: 'status' },
  success: { icon: 'circle-check', box: 'bg-moss-soft', iconColor: 'text-moss', role: 'status' },
}

/**
 * @param {object} props
 * @param {'error'|'info'|'success'} [props.tone]
 * @param {React.ReactNode} [props.title]
 * @param {React.ReactNode} [props.action] A follow-up control, e.g. a Button.
 */
export function Alert({ tone = 'info', title, action, className = '', children }) {
  const t = TONES[tone]
  return (
    <div
      role={t.role}
      className={`flex items-start gap-2 rounded-md px-4 py-3 text-body text-ink ${t.box} ${className}`}
    >
      <Icon name={t.icon} className={`mt-0.5 ${t.iconColor}`} />
      <div>
        {title ? <span className="block font-semibold">{title}</span> : null}
        {children}
        {action ? <div className="mt-2">{action}</div> : null}
      </div>
    </div>
  )
}
