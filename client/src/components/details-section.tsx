import { Calendar, Clock, MapPin, Shirt, Car, Gift } from "lucide-react";
import type { Invitation } from "@shared/schema";

interface DetailsSectionProps {
  invitation: Invitation;
}

export default function DetailsSection({ invitation }: DetailsSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-deep-sage mb-4">Reception Details</h2>
          <p className="text-gray-600 text-lg">Join us in celebrating our special day</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blush to-sage mx-auto mt-4"></div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* Reception Details - Centered */}
          <div className="bg-gradient-to-br from-sage/10 to-deep-sage/10 p-8 rounded-2xl shadow-xl relative">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-sage rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-display text-2xl font-bold text-deep-sage">Reception</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blush mr-3" />
                <div>
                  <div className="font-semibold text-deep-sage">Date</div>
                  <div className="text-gray-600">{invitation.weddingDate}</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-blush mr-3" />
                <div>
                  <div className="font-semibold text-deep-sage">Time</div>
                  <div className="text-gray-600">{invitation.receptionTime}</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blush mr-3 mt-1" />
                <div>
                  <div className="font-semibold text-deep-sage">Location</div>
                  <div className="text-gray-600 whitespace-pre-line">
                    {invitation.receptionVenue}
                    <br />
                    {invitation.receptionAddress}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <button className="bg-gradient-to-r from-sage to-deep-sage text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                <MapPin className="inline-block h-4 w-4 mr-2" />
                Get Directions
              </button>
              <button className="bg-gradient-to-r from-blush to-rose-gold text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                <Gift className="inline-block h-4 w-4 mr-2" />
                View Menu
              </button>
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="mt-12 bg-gradient-to-r from-blush/10 to-sage/10 p-8 rounded-2xl">
          <h3 className="font-display text-2xl font-bold text-deep-sage text-center mb-6">Important Information</h3>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blush rounded-full flex items-center justify-center mx-auto mb-3">
                <Shirt className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-deep-sage mb-2">Dress Code</h4>
              <p className="text-gray-600 text-sm">{invitation.dressCode || "Cocktail Attire"}</p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center mx-auto mb-3">
                <Car className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-deep-sage mb-2">Parking</h4>
              <p className="text-gray-600 text-sm">Free On-Site Parking</p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-rose-gold rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-deep-sage mb-2">Registry</h4>
              <p className="text-gray-600 text-sm">Your presence is our present</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
