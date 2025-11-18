import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type { Event } from '../types/event';
import { getEventsForDate } from '../data/events';
import EventDetailPanel from './EventDetailPanel';
import Navbar from './navbar';

interface EventCalendarProps {
  initialDate?: Date;
}

const EventCalendar: React.FC<EventCalendarProps> = ({ 
  initialDate = new Date(2024, 10, 5) // November 5, 2024 (month is 0-indexed)
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const gridRef = useRef<HTMLDivElement>(null);

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Generate date cards for the week view (14 days)
  const dateCards = useMemo(() => {
    const dates: Date[] = [];
    const startDate = new Date(selectedDate);
    // Start from the Monday of the week containing selectedDate
    const dayOfWeek = startDate.getDay();
    const diff = startDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust to Monday
    startDate.setDate(diff);
    
    // Generate 14 days (2 weeks)
    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  }, [selectedDate]);

  // Get events for selected date
  const dayEvents = useMemo(() => {
    return getEventsForDate(selectedDate);
  }, [selectedDate]);

  // Time slots (12:00 AM to 11:30 PM)
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    for (let hour = 0; hour <= 23; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  }, []);

  // Convert time string (HH:MM) to minutes from 12:00 AM
  const timeToMinutes = useCallback((timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes;
    const startMinutes = 0 * 60; // 12:00 AM
    return totalMinutes - startMinutes;
  }, []);

  // Height per hour in pixels (1 hour = 80px)
  const pixelsPerHour = 80;

  // Get current time position
  const currentTimePosition = useMemo(() => {
    const now = currentTime;
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const totalMinutes = hours * 60 + minutes;
    const startMinutes = 0 * 60; // 12:00 AM
    return totalMinutes - startMinutes;
  }, [currentTime]);

  // Check if current time is within selected date
  const isCurrentDate = useMemo(() => {
    const today = new Date();
    return (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    );
  }, [selectedDate]);

  // Navigate dates
  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const monthName = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navbar */}
      <div className="mx-auto w-full max-w-site-nav px-2 md:px-8 py-4">
        <Navbar />
      </div>

      <div className="w-full py-8 px-4 md:px-8">
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button className="relative px-4 py-2 bg-black text-white border border-black rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2 text-sm font-medium">
              Request Approval
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                10
              </span>
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Schedule settings
            </div>
          </div>
          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 text-sm font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create event
          </button>
        </div>

        {/* Date Navigation */}
        <div className="mb-6">
          <div className=" mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{monthName}</h2>
          </div>
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={() => navigateWeek('prev')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2 flex-1">
              {dateCards.map((date, index) => {
                const isSelected = date.toDateString() === selectedDate.toDateString();
                const dayName = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
                const dayNumber = date.getDate();
                const hasEvent = getEventsForDate(date).length > 0;

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    className={`
                      flex-1 px-4 py-3 rounded-lg border-2 transition-all
                      ${isSelected 
                        ? 'bg-red-500 border-red-600 text-white shadow-sm' 
                        : 'bg-red-50 border-red-400 text-gray-900 hover:bg-red-500 hover:text-white hover:border-red-600'
                      }
                    `}
                  >
                    <div className="text-center">
                      <div className={`text-xs mb-1 ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>{dayName}</div>
                      <div className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                        {dayNumber}
                      </div>
                      {hasEvent && (
                        <div className="mt-1 flex justify-center">
                          <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : 'bg-red-500'}`}></div>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => navigateWeek('next')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Time Grid */}
        <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden">
          <style>{`
            [data-scroll-container]::-webkit-scrollbar {
              display: none !important;
              width: 0 !important;
              height: 0 !important;
              background: transparent !important;
            }
          `}</style>
          <div 
            ref={gridRef} 
            className="relative overflow-y-auto" 
            data-scroll-container
            style={{ 
              minHeight: '800px',
              maxHeight: '800px',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Time Labels */}
            <div className="absolute left-0 top-0 w-32 border-r border-gray-200 bg-gray-50 z-20" style={{ height: `${24 * pixelsPerHour}px` }}>
              {timeSlots.map((time, index) => {
                const [hours, minutes] = time.split(':').map(Number);
                const showLabel = minutes === 0; // Only show hour labels
                
                if (!showLabel) return null;

                const position = timeToMinutes(time);
                const topPixels = (position / 60) * pixelsPerHour;

                // Convert to 12-hour format with AM/PM
                const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
                const ampm = hours < 12 ? 'AM' : 'PM';

                return (
                  <div
                    key={index}
                    className="absolute text-sm text-gray-600 font-medium text-right"
                    style={{ 
                      top: `${topPixels}px`,
                      lineHeight: '1.5',
                      right: '12px',
                      left: '12px',
                      width: 'calc(100% - 24px)',
                      paddingTop: '8px'
                    }}
                  >
                    {displayHour}:00 {ampm}
                  </div>
                );
              })}
            </div>

            {/* Grid Lines Container - positioned behind everything */}
            <div className="absolute left-32 right-0 top-0 bottom-0 z-0" style={{ height: `${24 * pixelsPerHour}px`, pointerEvents: 'none' }}>
              {timeSlots.map((time, index) => {
                const position = timeToMinutes(time);
                const topPixels = (position / 60) * pixelsPerHour;
                const isHour = time.endsWith(':00');

                return (
                  <div
                    key={index}
                    className="absolute left-0 right-0 border-t"
                    style={{
                      top: `${topPixels}px`,
                      borderColor: isHour ? '#e5e7eb' : '#f3f4f6',
                      pointerEvents: 'none',
                    }}
                  />
                );
              })}
            </div>

            {/* Event Cards Container */}
            <div className="ml-32 relative z-10 overflow-x-auto" data-scroll-container style={{ minHeight: `${24 * pixelsPerHour}px`, scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              
              {/* Grid Lines Overlay - inside event container */}
              <div className="absolute left-0 right-0 top-0 z-10" style={{ height: `${24 * pixelsPerHour}px`, pointerEvents: 'none' }}>
                {timeSlots.map((time, index) => {
                  const position = timeToMinutes(time);
                  const topPixels = (position / 60) * pixelsPerHour;
                  const isHour = time.endsWith(':00');

                  return (
                    <div
                      key={index}
                      className="absolute left-0 right-0 border-t"
                      style={{
                        top: `${topPixels}px`,
                        borderColor: isHour ? '#e5e7eb' : '#f3f4f6',
                        pointerEvents: 'none',
                      }}
                    />
                  );
                })}
              </div>

              {dayEvents.map((event, index) => {
                const startMinutes = timeToMinutes(event.startTime);
                const endMinutes = timeToMinutes(event.endTime);
                const duration = endMinutes - startMinutes;
                
                // Use pixel-based positioning instead of percentage
                const topPosition = (startMinutes / 60) * pixelsPerHour; // Convert minutes to pixels
                const height = (duration / 60) * pixelsPerHour; // Convert duration to pixels

                // Find all events that overlap with this event (including same start time)
                const overlappingEvents = dayEvents.filter((e, idx) => {
                  if (idx === index) return false;
                  const eStart = timeToMinutes(e.startTime);
                  const eEnd = timeToMinutes(e.endTime);
                  // Check if events overlap in time
                  return (startMinutes < eEnd && endMinutes > eStart);
                });

                // Group overlapping events together and sort by start time, then by index
                const allOverlappingEvents = [...overlappingEvents, event].sort((a, b) => {
                  const aStart = timeToMinutes(a.startTime);
                  const bStart = timeToMinutes(b.startTime);
                  if (aStart !== bStart) {
                    return aStart - bStart; // Sort by start time first
                  }
                  // If same start time, sort by index
                  const aIdx = dayEvents.indexOf(a);
                  const bIdx = dayEvents.indexOf(b);
                  return aIdx - bIdx;
                });

                // Get position in the overlapping group
                const positionInGroup = allOverlappingEvents.findIndex(e => e === event);

                // Calculate width and position for fitted cards with spacing
                const cardWidth = 360; // Fixed width for event cards in pixels
                const spacing = 12; // Spacing between cards in pixels
                const leftMargin = 32; // Time column width (w-32 = 128px)
                
                // Calculate left position - cards stack horizontally with spacing
                const leftPosition = leftMargin + (positionInGroup * (cardWidth + spacing));

                return (
                  <div
                    key={index}
                    onClick={() => handleEventClick(event)}
                    className="absolute rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all border-l-4 z-20"
                    style={{
                      top: `${topPosition}px`,
                      height: `${Math.max(height, 100)}px`, // Minimum 100px height
                      left: `${leftPosition}px`,
                      width: `${cardWidth}px`,
                      backgroundColor: event.color || '#f3f4f6',
                      borderLeftColor: event.color 
                        ? (event.color === '#fef3c7' ? '#f59e0b' : // yellow -> amber
                           event.color === '#fef9c3' ? '#eab308' : // lighter yellow -> yellow
                           event.color === '#fce7f3' ? '#ec4899' : // pink -> pink
                           event.color === '#dbeafe' ? '#2563eb' : // blue -> blue
                           event.color === '#e0e7ff' ? '#6366f1' : // indigo -> indigo
                           event.color === '#ccfbf1' ? '#14b8a6' : // teal -> teal
                           event.color === '#f3e8ff' ? '#a855f7' : // violet -> purple
                           event.color === '#fed7aa' ? '#ea580c' : // orange -> orange
                           event.color === '#cffafe' ? '#06b6d4' : // cyan -> cyan
                           event.color === '#fef2f2' ? '#f87171' : // rose -> red
                           event.color === '#e0f2fe' ? '#0ea5e9' : // sky -> sky
                           event.color === '#dcfce7' ? '#16a34a' : // green -> green
                           event.color === '#f5d0fe' ? '#d946ef' : // fuchsia -> fuchsia
                           '#9333ea')
                        : '#6b7280',
                    }}
                  >
                    <div className="h-full flex flex-col">
                      {/* Header: Title on left, Organizer icon on right */}
                      <div className="flex items-center justify-between p-3 pb-2">
                        <h3 className="font-bold text-sm text-gray-900 leading-tight line-clamp-1 flex-1 pr-2">{event.title}</h3>
                        {event.organizer?.avatar && (
                          <img 
                            src={event.organizer.avatar} 
                            alt={event.organizer.name}
                            className="w-6 h-6 rounded-full flex-shrink-0 border-2 border-white shadow-sm"
                          />
                        )}
                      </div>
                      
                      {/* Event Banner Image - 60% of card height */}
                      {event.imageHeader && (
                        <div 
                          className="w-full overflow-hidden px-3 mb-2 rounded"
                          style={{ height: `${Math.max(height * 0.6, 60)}px` }}
                        >
                          <img 
                            src={event.imageHeader} 
                            alt={event.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between px-3 pb-3">
                        <div className="flex-1">
                          {/* Description with truncation */}
                          <p className="text-xs text-gray-600 mb-2 line-clamp-2 leading-snug">
                            {event.description.length > 80 
                              ? `${event.description.substring(0, 80)}...` 
                              : event.description}
                          </p>
                          
                          {/* Location */}
                          <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-xs text-gray-500 font-medium">{event.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Current Time Indicator */}
            {isCurrentDate && currentTimePosition >= 0 && currentTimePosition <= 24 * 60 && (
              <div
                className="absolute left-32 right-0 z-60"
                style={{
                  top: `${(currentTimePosition / 60) * pixelsPerHour}px`,
                }}
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5"></div>
                  <div className="flex-1 h-0.5 bg-red-500"></div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Event Detail Panel */}
        <EventDetailPanel
          event={selectedEvent}
          date={selectedEvent ? selectedDate : null}
          onClose={() => {
            setSelectedEvent(null);
          }}
          onRegister={() => {
            console.log('Registered for event:', selectedEvent?.title);
          }}
        />
      </div>
    </div>
  );
};

export default EventCalendar;