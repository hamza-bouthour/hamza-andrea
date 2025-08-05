import { useState } from "react";

interface GallerySectionProps {
  photos: string[];
}

export default function GallerySection({ photos }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryPhotos = photos;

  return (
    <section className="py-20 gradient-bg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-deep-sage mb-4">Our Journey Together</h2>
          <p className="text-gray-600 text-lg">Capturing our beautiful moments</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blush to-sage mx-auto mt-4"></div>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Large featured image */}
          <div className="col-span-2 row-span-2">
            <img 
              src={galleryPhotos[0]}
              alt="Wedding couple - featured photo"
              className="w-full h-full object-cover rounded-xl shadow-lg image-hover cursor-pointer"
              style={{
                filter: 'brightness(1.05) contrast(1.02) saturate(1.05)',
                objectPosition: 'center center'
              }}
              onClick={() => setSelectedImage(galleryPhotos[0])}
            />
          </div>
          
          {/* Other gallery images */}
          {galleryPhotos.slice(1).map((photo, index) => (
            <img 
              key={index}
              src={photo}
              alt={`Wedding gallery photo ${index + 2}`}
              className={`w-full object-cover rounded-xl shadow-lg image-hover cursor-pointer ${
                index === 5 || index === 6 ? 'h-64' : 'h-48'
              }`}
              style={{
                filter: 'brightness(1.03) contrast(1.01) saturate(1.03)',
                objectPosition: 'center center'
              }}
              onClick={() => setSelectedImage(photo)}
            />
          ))}
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={selectedImage}
              alt="Enlarged gallery image"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <button 
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
