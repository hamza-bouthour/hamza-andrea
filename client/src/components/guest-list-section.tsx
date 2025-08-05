import type { Guest } from "@shared/schema";
import { Users, Heart } from "lucide-react";

interface GuestListSectionProps {
  guests: Guest[];
}

export default function GuestListSection({ guests }: GuestListSectionProps) {
  if (!guests || guests.length === 0) return null;

  return (
    <section className="py-16 px-6 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-6 w-6 text-blush" />
          <h2 className="font-display text-4xl md:text-5xl text-deep-sage">
            Our Celebrated Guests
          </h2>
          <Heart className="h-6 w-6 text-blush" />
        </div>
        <p className="text-lg text-gray-600 font-light">
          These wonderful people have confirmed their presence for our special day
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-sage/20">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Users className="h-5 w-5 text-deep-sage" />
          <span className="text-deep-sage font-semibold">
            {guests.length} {guests.length === 1 ? 'Guest' : 'Guests'} Confirmed
          </span>
        </div>

        <div className="grid gap-6 md:gap-8">
          {guests.map((guest) => (
            <div 
              key={guest.id} 
              className="flex flex-col items-center text-center p-6 bg-gradient-to-r from-blush/5 to-sage/5 rounded-xl border border-champagne/30"
            >
              <h3 className="font-display text-2xl text-deep-sage mb-2">
                {guest.firstName} {guest.lastName}
              </h3>
              
              {guest.siblingsInvited && (
                <div className="text-gray-600">
                  <p className="text-sm font-medium mb-1">Plus family:</p>
                  <p className="text-base">{guest.siblingsInvited}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}