import type * as React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = Moss fill (one per screen); secondary = Paper with a Rule outline (default);
   *  google / apple = the providers' own button colours, for "Continue with Google / Apple" only. */
  variant?: 'primary' | 'secondary' | 'google' | 'apple';
  /** Full width of its container (sign-up stacks). */
  block?: boolean;
  /** A 20px icon, or for `apple` the full-height left-aligned logo tile, provided by the consumer. */
  icon?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): React.ReactElement;
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Graphite helper line under the field. */
  helper?: React.ReactNode;
  /** Error message; replaces helper, sets aria-invalid, shows an icon and is announced. */
  error?: React.ReactNode;
}
export declare function TextField(props: TextFieldProps): React.ReactElement;
export interface DividerProps { /** Default "or". */ children?: React.ReactNode }
export declare function Divider(props: DividerProps): React.ReactElement;
export interface Institution { name: string; domain: string }
export interface InstitutionPickerProps {
  /** The full list to filter by name or domain; or pass `results` to filter yourself. */
  institutions?: Institution[];
  results?: Institution[];
  label?: string;
  placeholder?: string;
  defaultQuery?: string;
  defaultOpen?: boolean;
  /** idle (default), loading (skeleton rows), redirecting (spinner + Cancel). */
  state?: 'idle' | 'loading' | 'redirecting';
  /** Institution name shown while redirecting. */
  redirectTo?: string;
  onQueryChange?: (query: string) => void;
  onSelect?: (institution: Institution) => void;
  onCancel?: () => void;
  onRequestInstitution?: () => void;
}
export declare function InstitutionPicker(props: InstitutionPickerProps): React.ReactElement;
export interface AlertProps {
  tone?: 'error' | 'info' | 'success';
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** A follow-up control, e.g. a Button. */
  action?: React.ReactNode;
}
export declare function Alert(props: AlertProps): React.ReactElement;
export interface HighlightProps { children?: React.ReactNode }
export declare function Highlight(props: HighlightProps): React.ReactElement;
export type IconName = 'search' | 'circle-alert' | 'circle-check' | 'check' | 'x' | 'chevron-down' | 'arrow-right' | 'external-link' | 'loader-circle' | 'landmark' | 'graduation-cap' | 'mail' | 'eye' | 'eye-off' | 'notebook-pen' | 'book-open' | 'file-text' | 'bookmark' | 'library' | 'quote' | 'highlighter' | 'info';
export interface IconProps {
  name: IconName;
  /** Pixel size; default 20 (UI), 24 for standalone. */
  size?: number;
  /** Accessible name; omit for decorative icons (aria-hidden). */
  label?: string;
  className?: string;
}
/** Lucide icons, stroke 2, coloured by CSS `color` (currentColor). `Icon.names` lists them. */
export declare function Icon(props: IconProps): React.ReactElement;
declare global { interface Window { Fieldnote: { Button: typeof Button; TextField: typeof TextField; Divider: typeof Divider; InstitutionPicker: typeof InstitutionPicker; Alert: typeof Alert; Highlight: typeof Highlight; Icon: typeof Icon } } }
