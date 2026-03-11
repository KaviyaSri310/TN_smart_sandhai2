import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MarketInfo {
  id: string;
  name: string;
  district: string;
  block: string;
  panchayat: string;
  date: string;
}

interface BookingState {
  market: MarketInfo | null;
  stallType: string | null;
  commodity: string | null;
  amount: number;
}

interface BookingContextType {
  booking: BookingState;
  setMarket: (market: MarketInfo) => void;
  setStallType: (stallType: string) => void;
  setCommodity: (commodity: string) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [booking, setBooking] = useState<BookingState>({
    market: null,
    stallType: null,
    commodity: null,
    amount: 0,
  });

  const setMarket = (market: MarketInfo) => {
    setBooking(prev => ({ ...prev, market }));
  };

  const setStallType = (stallType: string) => {
    // Fixed prices as requested
    let amount = 0;
    switch (stallType) {
      case 'small':
        amount = 50;
        break;
      case 'medium':
        amount = 100;
        break;
      case 'large':
        amount = 150;
        break;
      case 'roadside':
        amount = 30;
        break;
      default:
        amount = 0;
    }

    setBooking(prev => ({ ...prev, stallType, amount }));
  };

  const setCommodity = (commodity: string) => {
    setBooking(prev => ({ ...prev, commodity }));
  };

  const resetBooking = () => {
    setBooking({
      market: null,
      stallType: null,
      commodity: null,
      amount: 0,
    });
  };

  return (
    <BookingContext.Provider value={{ booking, setMarket, setStallType, setCommodity, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
