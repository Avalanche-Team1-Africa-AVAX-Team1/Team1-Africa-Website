import { useEffect, useRef, useState } from 'react';
import type { Event } from '../types/event';
import { gsap } from 'gsap';

interface EventDetailPanelProps {
  event: Event | null;
  date: Date | null;
  onClose: () => void;
  onRegister?: () => void;
}

const EventDetailPanel = ({ event, date, onClose, onRegister }: EventDetailPanelProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (panelRef.current && overlayRef.current) {
      if (event || date) {
        // Animate in
        gsap.fromTo(overlayRef.current, 
          { opacity: 0 },
          { opacity: 1, duration: 0.3 }
        );
        gsap.fromTo(panelRef.current,
          { 
            opacity: 0,
            scale: 0.9,
            y: 50,
            rotationX: -15
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationX: 0,
            duration: 0.5,
            ease: 'power3.out',
            transformPerspective: 1000
          }
        );
      } else {
        // Animate out
        gsap.to(panelRef.current, {
          opacity: 0,
          scale: 0.9,
          y: 50,
          rotationX: -15,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: onClose
        });
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3
        });
      }
    }
  }, [event, date, onClose]);

  const handleRegister = () => {
    if (onRegister) {
      onRegister();
    }
    setIsRegistered(true);
    // Animate button state change
    gsap.to('.register-button', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    });
  };

  if (!event && !date) return null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
        style={{ opacity: 0 }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <div
          className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,250,255,0.95) 100%)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-0">
            {event ? (
              <>
                {/* Image Header */}
                {event.imageHeader && (
                  <div className="w-full h-64 overflow-hidden rounded-t-2xl">
                    <img 
                      src={event.imageHeader} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-8">
                  {/* Event Header */}
                  <div className="mb-6">
                    <div className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full mb-4">
                      Event Scheduled
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">{event.title}</h2>
                    <p className="text-gray-600 text-lg">{formatDate(new Date(event.date))}</p>
                  </div>

                {/* Event Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="text-gray-900 font-medium">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="text-gray-900 font-medium">{event.location}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                </div>

                {/* Organizer */}
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500 mb-2">Organized by</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={event.organizer.avatar}
                      alt={event.organizer.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    />
                    <p className="font-semibold text-gray-900">{event.organizer.name}</p>
                  </div>
                </div>

                {/* Attendees */}
                {event.attendees.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-3">
                      {event.attendees.length} {event.attendees.length === 1 ? 'person' : 'people'} attending
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {event.attendees.map((attendee, index) => (
                        <div key={index} className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow-sm border border-gray-100">
                          <img
                            src={attendee.avatar}
                            alt={attendee.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm text-gray-700">{attendee.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Register Button */}
                <button
                  onClick={handleRegister}
                  disabled={isRegistered}
                  className="register-button w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRegistered ? '✓ Registered' : 'Register / Attend'}
                </button>
                </div>
              </>
            ) : (
              <>
                {/* Empty Date */}
                <div className="p-8 text-center py-12">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No Event Scheduled</h3>
                  <p className="text-gray-600 mb-6">{formatDate(date!)}</p>
                  <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                  >
                    Create Event
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailPanel;

