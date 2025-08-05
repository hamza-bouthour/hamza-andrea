import { Heart } from "lucide-react";
import type { Invitation } from "@shared/schema";

interface HeroSectionProps {
  invitation: Invitation;
}

export default function HeroSection({ invitation }: HeroSectionProps) {


  return (
    <section className="min-h-screen gradient-bg flex items-center justify-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blush rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-sage rounded-full blur-3xl"></div>
      </div>
      
      <div className="text-center z-10 px-4 animate-fade-in">
        <div className="mb-8">
          {/* Main couple portrait */}
          <img 
            src={invitation.photos[0]} 
            alt={`${invitation.groomName} and ${invitation.brideName} - Beautiful couple portrait`}
            className="w-64 h-64 md:w-80 md:h-80 rounded-full mx-auto shadow-2xl object-cover border-8 border-white image-hover"
            style={{
              filter: 'brightness(1.1) contrast(1.05) saturate(1.1)',
              objectPosition: 'center top'
            }}
          />
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl font-bold text-deep-sage mb-4">
          {invitation.groomName} <span className="text-blush">&</span> {invitation.brideName}
        </h1>
        
        <p className="font-script text-2xl md:text-3xl text-gray-600 mb-6">
          are getting married!
        </p>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl max-w-md mx-auto mb-8">
          <div className="text-sage font-semibold text-lg mb-2">Save the Date</div>
          <div className="font-display text-3xl text-deep-sage font-bold">{invitation.weddingDate}</div>
          <div className="text-gray-600 mt-2">{invitation.receptionVenue}</div>
        </div>
        

      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-10 animate-float">
        <Heart className="h-6 w-6 text-blush opacity-30" />
      </div>
      <div className="absolute top-3/4 right-20 animate-float-delayed">
        <Heart className="h-5 w-5 text-sage opacity-30" />
      </div>
    </section>
  );
}
