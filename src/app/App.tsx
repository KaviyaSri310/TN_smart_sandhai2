import { RouterProvider } from 'react-router';
import { router } from './routes';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { useEffect } from 'react';
import { db } from './services/database';

export default function App() {
  useEffect(() => {
    // Initialize sample data on first load
    db.initializeSampleData();
  }, []);

  return (
    <LanguageProvider>
      <AuthProvider>
        <BookingProvider>
          <RouterProvider router={router} />
        </BookingProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}