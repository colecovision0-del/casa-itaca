import React, { useState } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export const Navigation: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const navigationItems = [
    { key: 'home', href: '#home' },
    { key: 'rooms', href: '#rooms' },
    { key: 'availability', href: '#availability' },
    { key: 'contact', href: '#contact' },
    { key: 'about', href: '#about' },
  ];

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="text-2xl font-heading font-bold text-primary hover:text-sea-light transition-colors duration-300">
              Apartamento Itaca
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors duration-300 font-medium relative group"
              >
                {t(item.key)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-300 p-2 rounded-md hover:bg-muted"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{currentLanguage?.flag} {currentLanguage?.name}</span>
                <span className="sm:hidden">{currentLanguage?.flag}</span>
              </button>
              
              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-md shadow-elegant z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors duration-200 first:rounded-t-md last:rounded-b-md ${
                        language === lang.code ? 'bg-muted text-primary font-medium' : 'text-foreground'
                      }`}
                    >
                      {lang.flag} {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-muted transition-colors duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-300 font-medium"
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Overlay for language dropdown */}
      {isLanguageOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsLanguageOpen(false)}
        />
      )}
    </nav>
  );
};