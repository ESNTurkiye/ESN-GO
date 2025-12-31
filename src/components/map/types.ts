/**
 * Type definitions for ESN Office Map System
 */

export interface OfficeCoordinates {
  lat: number;
  lng: number;
}

export interface Office {
  id: number;
  eventName: string;
  locationLabel: string;
  pic: string;
  instagram?: string | null;
  coordinates: OfficeCoordinates;
  startTime: string; // ISO 8601 string with timezone
  endTime: string; // ISO 8601 string with timezone
  note: string;
  type: 'party' | 'trip' | 'info' | 'sale' | 'other';
}

