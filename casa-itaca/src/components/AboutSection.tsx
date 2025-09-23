import React from 'react';
import { Star, Award, Users, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import beachImage from '../assets/beach-location.jpg';
const seaImage = 'https://imgur.com/MWv453g.jpg';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Star,
      title: t('luxuryExperience'),
      description: t('luxuryDescription')
    },
    {
      icon: Award, 
      title: t('primeLocation'),
      description: t('locationDescription')
    },
    {
      icon: Users,
      title: t('authenticHospitality'), 
      description: t('hospitalityDescription')
    },
    {
      icon: Heart,
      title: t('memorableMoments'),
      description: t('momentsDescription')
    }
  ];

  return (
    <section id="about" className="py-20 bg-cream">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
                {t('aboutTitle')}
              </h2>
              <div className="w-20 h-1 bg-gradient-sea rounded-full"></div>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('aboutText')}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-background/50 transition-all duration-300 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-sea rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-background" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-elegant">
              <img
                src={seaImage}
                alt="Marina di Ragusa Beach"
                className="w-full h-96 lg:h-[500px] object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-8 -left-8 bg-background border border-border rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">2019</div>
                <div className="text-sm text-muted-foreground">Established</div>
              </div>
            </div>
            
            <div className="absolute -top-8 -right-8 bg-background border border-border rounded-xl p-6 shadow-card">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">9.3★</div>
                <div className="text-sm text-muted-foreground">{t('guestRating')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};