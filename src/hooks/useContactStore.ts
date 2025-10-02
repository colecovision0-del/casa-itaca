import { create } from 'zustand';

interface ContactStore {
  checkInDate: string;
  checkOutDate: string;
  setDates: (checkIn: string, checkOut: string) => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  checkInDate: '',
  checkOutDate: '',
  setDates: (checkIn, checkOut) => set({ checkInDate: checkIn, checkOutDate: checkOut }),
}));
