type IconProps = { size?: number; className?: string }

const base = (size: number, className?: string) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className, 'aria-hidden': true })

export function DnaIcon({ size = 28, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M7 2c8 4 8 16 0 20M17 2c-8 4-8 16 0 20M6 6h12M5 12h14M6 18h12" /></svg>
}
export function ArrowIcon({ size = 18, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M5 12h14M14 7l5 5-5 5" /></svg>
}
export function ChevronIcon({ size = 18, className }: IconProps) {
  return <svg {...base(size, className)}><path d="m9 18 6-6-6-6" /></svg>
}
export function LayersIcon({ size = 20, className }: IconProps) {
  return <svg {...base(size, className)}><path d="m12 3-9 5 9 5 9-5-9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>
}
export function PauseIcon({ size = 18, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M8 5v14M16 5v14"/></svg>
}
export function PlayIcon({ size = 18, className }: IconProps) {
  return <svg {...base(size, className)}><path d="m8 5 11 7-11 7V5Z"/></svg>
}
export function ResetIcon({ size = 18, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>
}
export function InfoIcon({ size = 18, className }: IconProps) {
  return <svg {...base(size, className)}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>
}
export function EyeIcon({ size = 18, className }: IconProps) {
  return <svg {...base(size, className)}><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"/><circle cx="12" cy="12" r="2.5"/></svg>
}
