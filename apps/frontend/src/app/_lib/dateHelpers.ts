/**
 * Date helper utilities for ESN Office Map System
 * Handles timezone-aware status checking and display formatting
 */

export type OfficeStatus = "upcoming" | "active" | "closed";
export const getOfficeStatus = (startIso: string, endIso: string): OfficeStatus => {
  const now = new Date();
  const start = new Date(startIso);
  const end = new Date(endIso);

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "active";
  return "closed";
};

export const formatTimeTR = (isoString: string): string => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('tr-TR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Istanbul',
  }).format(date);
};