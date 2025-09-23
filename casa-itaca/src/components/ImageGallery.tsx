import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
const mainGroundFloor = 'https://imgur.com/opiXPmr.jpg';


// Import all gallery images
import image1 from '../assets/gallery/image-1.jpg';
import image2 from '../assets/gallery/image-2.jpg';
import image3 from '../assets/gallery/image-3.jpg';
import image4 from '../assets/gallery/image-4.jpg';
import image5 from '../assets/gallery/image-5.jpg';
import image6 from '../assets/gallery/image-6.jpg';
import image7 from '../assets/gallery/image-7.jpg';
import image8 from '../assets/gallery/image-8.jpg';
import image9 from '../assets/gallery/image-9.jpg';
import image10 from '../assets/gallery/image-10.jpg';
import image11 from '../assets/gallery/image-11.jpg';
import image12 from '../assets/gallery/image-12.jpg';
import image13 from '../assets/gallery/image-13.jpg';
import image14 from '../assets/gallery/image-14.jpg';
import image15 from '../assets/gallery/image-15.jpg';
import image16 from '../assets/gallery/image-16.jpg';
import image17 from '../assets/gallery/image-17.jpg';
import image18 from '../assets/gallery/image-18.jpg';
import image19 from '../assets/gallery/image-19.jpg';
import image20 from '../assets/gallery/image-20.jpg';
import image21 from '../assets/gallery/image-21.jpg';
import image22 from '../assets/gallery/image-22.jpg';
import image23 from '../assets/gallery/image-23.jpg';

const galleryImages = [
  mainGroundFloor, image2, image3, image4, image5, image6, image7, image8,
  image9, image10, image11, image12, image13, image14, image15,
  image16, image17, image18, image19, image20, image21, image22, image23
];

interface ImageGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  initialImageIndex?: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  isOpen, 
  onClose, 
  initialImageIndex = 0 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialImageIndex);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  React.useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(initialImageIndex);
    }
  }, [isOpen, initialImageIndex]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-screen p-0 bg-background/95 backdrop-blur-md">
        <div className="relative w-full h-full">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 bg-background/10 hover:bg-background/20 text-foreground"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Main Image */}
          <div className="flex items-center justify-center min-h-[60vh] p-4">
            <img
              src={galleryImages[currentImageIndex]}
              alt={`Gallery image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-elegant"
            />
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/10 hover:bg-background/20 text-foreground"
            onClick={prevImage}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/10 hover:bg-background/20 text-foreground"
            onClick={nextImage}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-md border-t border-border">
            <div className="flex overflow-x-auto p-4 space-x-2 scrollbar-hide">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentImageIndex
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-background/10 backdrop-blur-md rounded-full px-3 py-1 text-sm text-foreground">
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};