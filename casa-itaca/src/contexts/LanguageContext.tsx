import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'it' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    home: 'Home',
    rooms: 'Rooms & Rates',
    availability: 'Availability',
    contact: 'Contact',
    about: 'About',
    
    // Hero Section
    heroTitle: 'Welcome to Apartamento Itaca',
    heroSubtitle: 'Experience Mediterranean luxury in the neighbourhood of Marina di Ragusa, Sicily',
    heroDescription: 'Discover our elegant boutique hotel where timeless Sicilian charm meets modern comfort',
    bookNow: 'Book Now',
    exploreRooms: 'Explore Rooms',
    guestRating: 'Guest Rating',
    
    // About Section
    aboutTitle: 'Our Story',
    aboutText: 'Apartamento Itaca is a boutique gem nestled in the enchanting Marina di Ragusa, Sicily. Our place combines traditional Sicilian hospitality with contemporary elegance, offering guests an unforgettable Mediterranean experience.',
    luxuryExperience: 'Luxury Experience',
    luxuryDescription: 'Boutique elegance with personalized service',
    primeLocation: 'Prime Location',
    locationDescription: 'Steps away from pristine Mediterranean beaches',
    authenticHospitality: 'Authentic Hospitality',
    hospitalityDescription: 'Traditional Sicilian warmth and modern comfort',
    memorableMoments: 'Memorable Moments',
    momentsDescription: 'Creating unforgettable Mediterranean memories',
    
    // Rooms
    roomsTitle: 'Our Apartments',
    roomsSubtitle: 'Choose from our two beautiful apartments, each offering comfort and authentic Sicilian hospitality',
    deluxeRoom: 'Deluxe Room',
    seaView: 'Sea View Suite',
    familySuite: 'Family Suite',
    fromPrice: 'From €120/night',
    seaViewDescription: 'Spacious apartment with stunning sea views and modern amenities',
    familyDescription: 'Family-friendly apartment perfect for longer stays',
    allRoomsInclude: 'All Rooms Include',
    freeWifi: 'Free WiFi',
    airConditioning: 'Air Conditioning',
    welcomeAmenities: 'Welcome Amenities',
    freeParking: 'Free Parking',
    photoGallery: 'Photo Gallery',
    
    // Availability
    availabilitySubtitle: 'Check our real-time availability and book your perfect dates',
    available: 'Available',
    booked: 'Booked',
    pastDate: 'Past Date',
    readyToBook: 'Ready to Book?',
    readyToBookText: 'Contact us directly to secure your preferred dates and receive personalized assistance',
    
    // Contact
    contactTitle: 'Book Your Stay',
    contactSubtitle: 'Fill out the form below and we\'ll get back to you soon',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    checkInDate: 'Check-in Date',
    checkOutDate: 'Check-out Date',
    specialRequests: 'Special Requests',
    address: 'Via dell\'Arancio, 20, Marina di Ragusa, Sicilia, Italia',
    phone: '+39 0932 123456',
    email: 'info@hotelitaca.com',
    
    // Footer
    followUs: 'Follow Us',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Terms & Conditions',
  },
  it: {
    // Navigation
    home: 'Home',
    rooms: 'Camere e Tariffe',
    availability: 'Disponibilità',
    contact: 'Contatti',
    about: 'Chi Siamo',
    
    // Hero Section
    heroTitle: 'Benvenuti all\'Apartamento Itaca',
    heroSubtitle: 'Vivete il lusso mediterraneo nelle vicinanze di Marina di Ragusa, Sicilia',
    heroDescription: 'Scoprite il nostro elegante boutique hotel dove il fascino siciliano si incontra con il comfort moderno',
    bookNow: 'Prenota Ora',
    exploreRooms: 'Esplora Camere',
    guestRating: 'Valutazione Ospiti',
    
    // About Section
    aboutTitle: 'La Nostra Storia',
    aboutText: 'Apartamento Itaca è una gemma boutique immersa nell\'incantevole Marina di Ragusa, Sicilia. Il nostro posto combina l\'ospitalità tradizionale siciliana con l\'eleganza contemporanea.',
    luxuryExperience: 'Esperienza di Lusso',
    luxuryDescription: 'Eleganza boutique con servizio personalizzato',
    primeLocation: 'Posizione Privilegiata',
    locationDescription: 'A pochi passi dalle spiagge mediterranee incontaminate',
    authenticHospitality: 'Ospitalità Autentica',
    hospitalityDescription: 'Calore siciliano tradizionale e comfort moderno',
    memorableMoments: 'Momenti Memorabili',
    momentsDescription: 'Creando ricordi mediterranei indimenticabili',
    
    // Rooms
    roomsTitle: 'I Nostri Appartamenti',
    roomsSubtitle: 'Scegli tra i nostri due bellissimi appartamenti, ognuno offre comfort e autentica ospitalità siciliana',
    deluxeRoom: 'Camera Deluxe',
    seaView: 'Suite Vista Mare',
    familySuite: 'Suite Famiglia',
    fromPrice: 'Da €120/notte',
    seaViewDescription: 'Appartamento spazioso con vista mare mozzafiato e servizi moderni',
    familyDescription: 'Appartamento adatto alle famiglie, perfetto per soggiorni più lunghi',
    allRoomsInclude: 'Tutte le Camere Includono',
    freeWifi: 'WiFi Gratuito',
    airConditioning: 'Aria Condizionata',
    welcomeAmenities: 'Servizi di Benvenuto',
    freeParking: 'Parcheggio Gratuito',
    photoGallery: 'Galleria Fotografica',
    
    // Availability
    availabilitySubtitle: 'Controlla la nostra disponibilità in tempo reale e prenota le tue date perfette',
    available: 'Disponibile',
    booked: 'Prenotato',
    pastDate: 'Data Passata',
    readyToBook: 'Pronto a Prenotare?',
    readyToBookText: 'Contattaci direttamente per assicurarti le date preferite e ricevere assistenza personalizzata',
    
    // Contact
    contactTitle: 'Prenota il Tuo Soggiorno',
    contactSubtitle: 'Compila il modulo qui sotto e ti ricontatteremo presto',
    fullName: 'Nome Completo',
    emailAddress: 'Indirizzo Email',
    checkInDate: 'Data di Check-in',
    checkOutDate: 'Data di Check-out',
    specialRequests: 'Richieste Speciali',
    address: 'Via dell\'Arancio, 20, Marina di Ragusa, Sicilia, Italia',
    phone: '+39 0932 123456',
    email: 'info@hotelitaca.com',
    
    // Footer
    followUs: 'Seguici',
    privacyPolicy: 'Privacy Policy',
    termsConditions: 'Termini e Condizioni',
  },
  es: {
    // Navigation
    home: 'Inicio',
    rooms: 'Habitaciones y Tarifas',
    availability: 'Disponibilidad',
    contact: 'Contacto',
    about: 'Nosotros',
    
    // Hero Section
    heroTitle: 'Bienvenidos al Apartamento Itaca',
    heroSubtitle: 'Experimenta el lujo mediterráneo en la vecindad de Marina di Ragusa, Sicilia',
    heroDescription: 'Descubre nuestro elegante hotel boutique donde el encanto siciliano se encuentra con el confort moderno',
    bookNow: 'Reservar Ahora',
    exploreRooms: 'Explorar Habitaciones',
    guestRating: 'Calificación de Huéspedes',
    
    // About Section
    aboutTitle: 'Nuestra Historia',
    aboutText: 'Apartamento Itaca es una joya boutique situada en la encantadora Marina di Ragusa, Sicilia. Nuestro lugar combina la hospitalidad tradicional siciliana con la elegancia contemporánea.',
    luxuryExperience: 'Experiencia de Lujo',
    luxuryDescription: 'Elegancia boutique con servicio personalizado',
    primeLocation: 'Ubicación Privilegiada',
    locationDescription: 'A pasos de las playas mediterráneas pristinas',
    authenticHospitality: 'Hospitalidad Auténtica',
    hospitalityDescription: 'Calidez siciliana tradicional y comodidad moderna',
    memorableMoments: 'Momentos Memorables',
    momentsDescription: 'Creando recuerdos mediterráneos inolvidables',
    
    // Rooms
    roomsTitle: 'Nuestros Apartamentos',
    roomsSubtitle: 'Elige entre nuestros dos hermosos apartamentos, cada uno ofrece comodidad y auténtica hospitalidad siciliana',
    deluxeRoom: 'Habitación Deluxe',
    seaView: 'Suite Vista al Mar',
    familySuite: 'Suite Familiar',
    fromPrice: 'Desde €120/noche',
    seaViewDescription: 'Apartamento espacioso con vistas al mar impresionantes y servicios modernos',
    familyDescription: 'Apartamento familiar perfecto para estancias más largas',
    allRoomsInclude: 'Todas las Habitaciones Incluyen',
    freeWifi: 'WiFi Gratuito',
    airConditioning: 'Aire Acondicionado',
    welcomeAmenities: 'Servicios de Bienvenida',
    freeParking: 'Estacionamiento Gratuito',
    photoGallery: 'Galería de Fotos',
    
    // Availability
    availabilitySubtitle: 'Consulta nuestra disponibilidad en tiempo real y reserva tus fechas perfectas',
    available: 'Disponible',
    booked: 'Reservado',
    pastDate: 'Fecha Pasada',
    readyToBook: '¿Listo para Reservar?',
    readyToBookText: 'Contáctanos directamente para asegurar tus fechas preferidas y recibir asistencia personalizada',
    
    // Contact
    contactTitle: 'Reserva tu Estancia',
    contactSubtitle: 'Completa el formulario a continuación y te contactaremos pronto',
    fullName: 'Nombre Completo',
    emailAddress: 'Dirección de Email',
    checkInDate: 'Fecha de Check-in',
    checkOutDate: 'Fecha de Check-out',
    specialRequests: 'Solicitudes Especiales',
    address: 'Via dell\'Arancio, 20, Marina di Ragusa, Sicilia, Italia',
    phone: '+39 0932 123456',
    email: 'info@hotelitaca.com',
    
    // Footer
    followUs: 'Síguenos',
    privacyPolicy: 'Política de Privacidad',
    termsConditions: 'Términos y Condiciones',
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};