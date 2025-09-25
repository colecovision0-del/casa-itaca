import { create } from 'zustand';

interface ContactState {
  checkInDate: string;
  checkOutDate: string;
  setDates: (checkIn: string, checkOut: string) => void;
}

export const useContactStore = create<ContactState>((set) => ({
  checkInDate: '',
  checkOutDate: '',
  setDates: (checkIn, checkOut) => set({ checkInDate: checkIn, checkOutDate: checkOut }),
}));