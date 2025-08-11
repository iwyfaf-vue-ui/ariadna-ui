export default function clamp(min: number, middle: number, max: number): number {
  return Math.max(min, Math.min(middle, max));
}
