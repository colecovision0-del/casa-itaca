import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { fetchAvailability, type AvailabilityData } from '../services/availabilityService';
import { useContactStore } from '../hooks/useContactStore';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const AvailabilityCalendar: React.FC = () => {
  const { t } = useLanguage();
  const [value, setValue] = useState<Value>(null);
  const [availabilityData, setAvailabilityData] = useState<Record<string, AvailabilityData>>({});
  const [loading, setLoading] = useState(true);
  const { setDates } = useContactStore();

  useEffect(() => {
    const loadAvailability = async () => {
      try {
        setLoading(true);
        const data = await fetchAvailability();
        
        // Convert array to object for easier lookup
        const availabilityMap = data.reduce((acc, item) => {
          acc[item.date] = item;
          return acc;
        }, {} as Record<string, AvailabilityData>);
        
        setAvailabilityData(availabilityMap);
      } catch (error) {
        console.error('Failed to load availability data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAvailability();
  }, []);

  const formatDateKey = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const tileContent = ({ date }: { date: Date }) => {
    const dateKey = formatDateKey(date);
    const availability = availabilityData[dateKey];
    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));

    if (isPast || !availability) {
      return null;
    }

    return (
      <div className="availability-tile-content">
        {availability.available && availability.websitePrice && (
          <div className="text-xs font-semibold text-white bg-primary/90 rounded px-1 py-0.5 mt-1">
            €{availability.websitePrice}
          </div>
        )}
        {!availability.available && (
          <div className="text-xs font-medium text-white bg-destructive/90 rounded px-1 py-0.5 mt-1">
            Booked
          </div>
        )}
      </div>
    );
  };

  const handleDateChange = (newValue: Value) => {
    setValue(newValue);
    if (Array.isArray(newValue) && newValue[0] && newValue[1]) {
      const checkIn = formatDateKey(newValue[0]);
      const checkOut = formatDateKey(newValue[1]);
      setDates(checkIn, checkOut);
      // Scroll to contact section
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dateKey = formatDateKey(date);
    const availability = availabilityData[dateKey];
    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
    const isToday = date.toDateString() === new Date().toDateString();

    let className = 'availability-tile ';

    if (isPast) {
      className += 'past-date ';
    } else if (availability?.available) {
      className += 'available-date ';
    } else if (availability && !availability.available) {
      className += 'booked-date ';
    }

    if (isToday) {
      className += 'today ';
    }

    return className.trim();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <section id="availability" className="py-20 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
            {t('availability')} & Rates
          </h2>
          <div className="w-20 h-1 bg-gradient-sea rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('availabilitySubtitle')} Best rates guaranteed with exclusive online discounts.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Calendar Container */}
          <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
            <div className="mediterranean-calendar-container">
              <Calendar
                onChange={handleDateChange}
                value={value}
                selectRange={true}
                tileContent={tileContent}
                tileClassName={tileClassName}
                prevLabel={<ChevronLeft className="h-5 w-5" />}
                nextLabel={<ChevronRight className="h-5 w-5" />}
                prev2Label={null}
                next2Label={null}
                showNeighboringMonth={false}
                minDate={new Date()}
                className="mediterranean-calendar"
              />
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary rounded border"></div>
              <span className="text-muted-foreground">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-destructive rounded border"></div>
              <span className="text-muted-foreground">Booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-muted rounded border"></div>
              <span className="text-muted-foreground">Past Date</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-cream border border-border rounded-2xl p-8">
              <CalendarIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">
                Ready to Book?
              </h3>
              <p className="text-muted-foreground mb-6">
                Contact us to reserve your perfect Mediterranean getaway. Enjoy our exclusive direct booking rates.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  variant="default" 
                  size="lg" 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-primary hover:bg-primary/90"
                >
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  Book Now
                </Button>
                <Button variant="outline" size="lg">
                  Call Us: +39 0932 123456
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
