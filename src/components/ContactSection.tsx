import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { useContactStore } from '../hooks/useContactStore';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { checkInDate, checkOutDate, setDates } = useContactStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: checkInDate,
    checkOut: checkOutDate,
    message: ''
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, checkIn: checkInDate, checkOut: checkOutDate }));
  }, [checkInDate, checkOutDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.checkIn && formData.checkOut && formData.checkIn >= formData.checkOut) {
      toast({
        title: "Invalid Dates",
        description: "Check-out date must be after check-in date.",
        variant: "destructive",
      });
      return;
    }

    emailjs.send('service_t7q6mjf', 'template_e6k9p8q', formData, 'JelChz98UTCzUysU5')
      .then((result) => {
          console.log(result.text);
          toast({
            title: "Booking Request Sent!",
        description: "We'll get back to you within 24 hours to confirm your reservation.",
      });
      setFormData({ name: '', email: '', checkIn: '', checkOut: '', message: '' });
      setDates('', '');
      }, (error) => {
          console.log(error.text);
          toast({
            title: "Error sending booking request.",
            description: "Please try again later.",
            variant: "destructive",
          });
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => {
      const newData = { ...prevData, [name]: value };

      if (name === 'checkIn' && value) {
        const checkInDate = new Date(value);
        checkInDate.setDate(checkInDate.getDate() + 1);
        newData.checkOut = checkInDate.toISOString().split('T')[0];
      }

      return newData;
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      label: '',
      value: t('phone'),
      href: 'tel:+390932123456'
    },
    {
      icon: Mail,
      label: '', 
      value: t('email'),
      href: 'mailto:info@hotelitaca.com'
    },
    {
      icon: MapPin,
      label: ' ',
      value: t('address'),
      href: 'https://maps.app.goo.gl/yhQfhvfFJXCUkjiDA'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
            {t('contactTitle')}
          </h2>
          <div className="w-20 h-1 bg-gradient-sea rounded-full mx-auto"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Booking Form */}
          <div className="bg-background rounded-2xl border border-border p-8 shadow-soft">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <Calendar className="h-8 w-8 text-primary mx-auto" />
                <h3 className="text-2xl font-heading font-semibold text-foreground">
                  {t('contactTitle')}
                </h3>
                <p className="text-muted-foreground">
                  {t('contactSubtitle')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {t('fullName')} *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-muted border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      {t('emailAddress')} *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-muted border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="checkIn" className="text-sm font-medium text-foreground">
                      {t('checkInDate')}
                    </label>
                    <Input
                      id="checkIn"
                      name="checkIn"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      className="bg-muted border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="checkOut" className="text-sm font-medium text-foreground">
                      {t('checkOutDate')}
                    </label>
                    <Input
                      id="checkOut"
                      name="checkOut"
                      type="date"
                      min={formData.checkIn ? formData.checkIn : new Date().toISOString().split("T")[0]}
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      className="bg-muted border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {t('specialRequests')}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about any special requirements or preferences..."
                    className="bg-muted border-border focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="elegant" 
                  size="lg" 
                  className="w-full"
                >
                  Amuninni!
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start space-x-4 p-4 bg-background rounded-xl border border-border hover:shadow-soft transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-sea rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="h-6 w-6 text-background" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground">{info.label}</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Business Hours */}
            <div className="bg-background rounded-xl border border-border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-sunset rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-background" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Reception Hours</h3>
              </div>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Monday - Sunday</span>
                  <span className="font-medium">7:00 AM - 11:00 PM</span>
                </div>
       
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};