export interface Organizer {
  name: string;
  avatar: string;
}

export interface Attendee {
  name: string;
  avatar: string;
}

export interface Event {
  date: string; // YYYY-MM-DD format
  title: string;
  description: string;
  time: string; // Display format like "6:00 PM - 9:00 PM"
  startTime: string; // HH:MM format (24-hour) for positioning
  endTime: string; // HH:MM format (24-hour) for positioning
  location: string;
  room?: string; // Room name/number
  capacity: number; // Total capacity
  currentAttendees: number; // Current number of attendees
  organizer: Organizer;
  attendees: Attendee[];
  color?: string; // Optional color for event card
  imageHeader?: string; // Header image URL for the event
}

export interface CalendarDate {
  date: Date;
  day: number;
  isCurrentMonth: boolean;
  event?: Event;
}

