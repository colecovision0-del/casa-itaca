import ICAL from 'ical.js';
import { calculatePrice } from './pricingService';

// Correct iCal feed URLs for the two apartments
const EXTERNAL_CALENDAR_URLS = [
  '/ical-proxy-1',
  '/ical-proxy-2'
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
        console.error(`Failed to fetch iCal data from ${response.url}. Status: ${response.status}`);
        // If a calendar fails, treat it as having no booked dates, so it doesn't make everything unavailable.
        return new Set<string>();
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

      // A date is considered booked only if it is present in ALL calendars.
      // This means a date is available if AT LEAST ONE apartment is free.
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
    // We now exclusively rely on the iCal data.
    return await parseICalData();
  } catch (error) {
    // If parsing fails, log the error and return an empty array.
    console.error('Failed to provide availability data due to an error.', error);
    return [];
  }
};