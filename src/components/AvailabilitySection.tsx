import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { calculatePrice } from '../services/pricingService';

export const AvailabilitySection: React.FC = () => {
  const { t } = useLanguage();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(Date.UTC(year, month, day)));
    }

    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentMonth);

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
            {t('availabilitySubtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Calendar Header */}
          <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
            <div className="flex items-center justify-between p-6 bg-gradient-sea text-background">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth('prev')}
                className="text-background hover:bg-background/20"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <h3 className="text-2xl font-heading font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth('next')}
                className="text-background hover:bg-background/20"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Day Names */}
            <div className="grid grid-cols-7 bg-muted">
              {dayNames.map(dayName => (
                <div key={dayName} className="p-4 text-center text-sm font-semibold text-muted-foreground border-r border-border last:border-r-0">
                  {dayName}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {days.map((day, index) => {
                if (!day) {
                  return <div key={index} className="h-20 border-r border-b border-border last:border-r-0"></div>;
                }

                const price = calculatePrice(day);
                const isToday = day.toDateString() === new Date().toDateString();
                const isPast = day < new Date(new Date().setHours(0, 0, 0, 0));

                // NOTE: Availability is assumed true for now. 
                // In a real app, this would be fetched from a booking system.
                const isAvailable = true; 

                return (
                  <div
                    key={index}
                    className={`h-20 border-r border-b border-border last:border-r-0 p-2 relative cursor-pointer transition-all duration-200 ${
                      isPast
                        ? 'bg-muted/50 cursor-not-allowed'
                        : isAvailable
                        ? 'hover:bg-cream bg-background'
                        : 'bg-destructive/10 cursor-not-allowed'
                    }`}
                  >
                    <div className="h-full flex flex-col justify-between">
                      <div className={`text-sm font-medium ${
                        isToday
                          ? 'text-primary font-bold'
                          : isPast
                          ? 'text-muted-foreground/50'
                          : isAvailable
                          ? 'text-foreground'
                          : 'text-destructive'
                      }`}>
                        {day.getDate()}
                      </div>
                      
                      {!isPast && (
                        <div className="text-xs">
                          {isAvailable ? (
                            <div className="text-primary font-semibold">
                              €{price}
                            </div>
                          ) : (
                            <div className="text-destructive font-medium">
                              {t('booked')}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    {isToday && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-cream border border-border rounded"></div>
              <span className="text-muted-foreground">{t('available')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-destructive/10 border border-border rounded"></div>
              <span className="text-muted-foreground">{t('booked')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-muted/50 border border-border rounded"></div>
              <span className="text-muted-foreground">{t('pastDate')}</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <div className="bg-cream border border-border rounded-2xl p-8">
              <CalendarIcon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">
                {t('readyToBook')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('readyToBookText')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button variant="elegant" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  {t('bookNow')}
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