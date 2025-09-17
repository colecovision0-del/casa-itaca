import React from 'react';
import { Camera, ImageIcon } from 'lucide-react';
import { Button } from './ui/button';

// Import first few images for preview
import image1 from '../assets/gallery/image-1.jpg';
import image2 from '../assets/gallery/image-2.jpg';
import image3 from '../assets/gallery/image-3.jpg';
import image4 from '../assets/gallery/image-4.jpg';

const previewImages = [image1, image2, image3, image4];

interface GalleryPreviewProps {
  onOpenGallery: () => void;
}

export const GalleryPreview: React.FC<GalleryPreviewProps> = ({ onOpenGallery }) => {
  return (
    <div className="relative group cursor-pointer" onClick={onOpenGallery}>
      {/* Main Preview Grid */}
      <div className="grid grid-cols-2 gap-2 h-64 rounded-lg overflow-hidden">
        {previewImages.map((image, index) => (
          <div 
            key={index}
            className="relative overflow-hidden bg-muted"
          >
            <img
              src={image}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {index === 3 && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center text-foreground">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                  <span className="text-sm font-medium">+19 more photos</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
        <Button variant="hero" size="lg">
          <Camera className="mr-2 h-5 w-5" />
          View Gallery
        </Button>
      </div>
    </div>
  );
};