/**
 * Portfolio V1 · Utility Functions
 */

/**
 * Merge class names, filtering out falsy values.
 */
export function cn(...inputs: (string | undefined | false | null)[]): string {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Smooth scroll to a section by ID.
 */
export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Format a date to YYYY.MM format.
 */
export function formatDate(date: string): string {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}.${m}`;
}

/**
 * Format a date range: "2024.10 — 2025.01"
 */
export function formatDateRange(start: string, end?: string): string {
  const startFormatted = formatDate(start);
  const endFormatted = end ? formatDate(end) : "至今";
  return `${startFormatted} — ${endFormatted}`;
}
