import ICAL from 'ical.js';
import { calculatePrice } from './pricingService';

// TODO: Replace this URL with your actual iCal feed URL
// Format: https://ical.booking.com/v1/export=YOUR_PROPERTY_ID
const EXTERNAL_CALENDAR_URLS = [
  'https://ical.booking.com/v1/export?t=6a508e72-47b8-441e-ab73-221ae38f7f5b',
  'https://ical.booking.com/v1/export?t=434277a1-8068-4518-b3d6-4699fcb96435' // TODO: Replace with the second calendar URL
];

export interface AvailabilityData {
  date: string;
  available: boolean;
  websitePrice?: number;
}

export interface AvailabilityResponse {
  availabilities: AvailabilityData[];
}

const parseICalData = async (): Promise<AvailabilityData[]> => {
  try {
    const responses = await Promise.all(EXTERNAL_CALENDAR_URLS.map(url => fetch(url)));

    const allBookedDates: Set<string>[] = await Promise.all(responses.map(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch iCal data from ${response.url}`);
      }
      const icalData = await response.text();
      const jcalData = ICAL.parse(icalData);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents('vevent');
      const bookedDates = new Set<string>();

      vevents.forEach(vevent => {
        const event = new ICAL.Event(vevent);
        const startDate = event.startDate.toJSDate();
        const endDate = event.endDate.toJSDate();

        for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split('T')[0];
          bookedDates.add(dateStr);
        }
      });
      return bookedDates;
    }));

    const availabilityData: AvailabilityData[] = [];
    const today = new Date();

    for (let i = 0; i < 90; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
      const dateStr = currentDate.toISOString().split('T')[0];

      // A date is only considered booked if it's present in all calendars.
      const isBooked = allBookedDates.every(bookedDates => bookedDates.has(dateStr));
      
      const websitePrice = !isBooked ? calculatePrice(currentDate) : undefined;

      availabilityData.push({
        date: dateStr,
        available: !isBooked,
        websitePrice
      });
    }

    return availabilityData;
  } catch (error) {
    console.error('Error parsing iCal data:', error);
    throw error;
  }
};

export const fetchAvailability = async (): Promise<AvailabilityData[]> => {
  try {
    // Try to parse iCal data from external calendar
    return await parseICalData();
  } catch (error) {
    // Fallback to API or mock data
    try {
      const response = await fetch('/api/availability');
      if (!response.ok) {
        throw new Error('Failed to fetch availability data');
      }
      
      const data: AvailabilityResponse = await response.json();
      return data.availabilities;
    } catch (apiError) {
      console.warn('Using mock availability data:', error);
      return getMockAvailabilityData();
    }
  }
};

const getMockAvailabilityData = (): AvailabilityData[] => {
  const mockData: AvailabilityData[] = [];
  const today = new Date();
  
  // Generate mock data for next 3 months
  for (let i = 0; i < 90; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(currentDate.getDate() + i);
    
    const dateStr = currentDate.toISOString().split('T')[0];
    const isAvailable = Math.random() > 0.3; // 70% availability rate
    const websitePrice = isAvailable ? calculatePrice(currentDate) : undefined;
    
    mockData.push({
      date: dateStr,
      available: isAvailable,
      websitePrice
    });
  }
  
  return mockData;
};
