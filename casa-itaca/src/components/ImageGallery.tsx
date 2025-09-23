import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';
import { Button } from './ui/button';
const mainGroundFloor = 'https://imgur.com/opiXPmr.jpg';


const galleryImages = [
  'https://imgur.com/j43myp5.jpg',
  'https://imgur.com/pbNFOVL.jpg',
  'https://imgur.com/KVlTfuf.jpg',
  'https://imgur.com/tJjHo1F.jpg',
  'https://imgur.com/u3ycmKv.jpg',
  'https://imgur.com/opiXPmr.jpg',
  'https://imgur.com/YJPTRYI.jpg',
  'https://imgur.com/U7SrgfT.jpg',
  'https://imgur.com/AVkJUch.jpg',
  'https://imgur.com/BbkZ08Z.jpg',
  'https://imgur.com/ev4Oifn.jpg',
  'https://imgur.com/oqHA3qU.jpg',
  'https://imgur.com/t55SYeT.jpg',
  'https://imgur.com/5xHHwc5.jpg',
  'https://imgur.com/OOpjz8O.jpg',
  'https://imgur.com/yIfgVld.jpg',
  'https://imgur.com/3ecArCr.jpg',
  'https://imgur.com/I7KZFsA.jpg',
  'https://imgur.com/GD1J1df.jpg',
  'https://imgur.com/FlnSbd1.jpg',
  'https://imgur.com/Zd7HPiU.jpg',
  'https://imgur.com/FJpGtVE.jpg',
  'https://imgur.com/fRVANGK.jpg',
  'https://imgur.com/C7cRU9z.jpg'
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