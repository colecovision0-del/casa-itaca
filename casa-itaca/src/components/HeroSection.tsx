import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import heroImage from '../assets/hero-hotel.jpg';
const mainImage = 'https://imgur.com/VRwLIA9.jpg';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={mainImage}
          alt="Apartamento Itaca - Marina di Ragusa, Sicily"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="space-y-6 animate-fade-in">
          {/* Location Badge */}
          <div className="inline-flex items-center space-x-2 bg-background/10 backdrop-blur-md border border-background/20 rounded-full px-4 py-2 text-background">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">Marina di Ragusa, Sicily</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-background leading-tight">
            {t('heroTitle')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-background/90 font-light max-w-3xl mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-background/80 max-w-2xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
            <Button variant="hero" size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <Calendar className="mr-2 h-5 w-5" />
              {t('bookNow')}
            </Button>
            <Button variant="heroSecondary" size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('exploreRooms')}
            </Button>
          </div>
        </div>

        {/* Floating Info Cards */}
        <div className="hidden lg:flex absolute bottom-8 left-8 right-8 justify-between items-center">
        
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-background/60 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-background/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};