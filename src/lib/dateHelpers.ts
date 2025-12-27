/**
 * Date helper utilities for ESN Office Map System
 * Handles timezone-aware status checking and display formatting
 */

export type OfficeStatus = "upcoming" | "active" | "closed";

/**
 * LOGIC: Check if office is currently active, upcoming, or closed
 * Compares current time with start/end times (timezone-aware)
 * @param startIso - ISO 8601 string with timezone (e.g., "2025-10-31T14:00:00+03:00")
 * @param endIso - ISO 8601 string with timezone
 * @returns Status: "upcoming" | "active" | "closed"
 */
export const getOfficeStatus = (startIso: string, endIso: string): OfficeStatus => {
  const now = new Date();
  const start = new Date(startIso);
  const end = new Date(endIso);

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "active";
  return "closed";
};

/**
 * DISPLAY: Format ISO date string to Turkish timezone display
 * Always shows time in Europe/Istanbul timezone regardless of user's location
 * @param isoString - ISO 8601 string with timezone
 * @returns Formatted time string (e.g., "14:00")
 */
export const formatTimeTR = (isoString: string): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Istanbul',
  }).format(date);
};

/**
 * Format full date and time for display
 * @param isoString - ISO 8601 string with timezone
 * @returns Formatted date and time string (e.g., "31 Ekim 2025, 14:00")
 */
export const formatDateTimeTR = (isoString: string): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Istanbul',
  }).format(date);
};

