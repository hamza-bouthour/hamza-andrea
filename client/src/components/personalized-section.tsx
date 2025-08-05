import type { Guest, Invitation } from "@shared/schema";

interface PersonalizedSectionProps {
  guest: Guest;
  invitation: Invitation;
}

export default function PersonalizedSection({ guest, invitation }: PersonalizedSectionProps) {
  const getPersonalizedMessage = (guest: Guest) => {
    const { firstName, lastName, siblingsInvited } = guest;
    
    if (siblingsInvited) {
      return `Dear ${firstName}, ${lastName}, ${siblingsInvited}, we are absolutely thrilled to have you celebrate this special day with us! Your presence means the world to ${invitation.groomName} and ${invitation.brideName}, and we can't wait to share the joy, laughter, and unforgettable moments of our wedding reception with you and your loved ones.`;
    }
    
    return `Dear ${firstName}, we are so excited to have you join us for our special celebration! ${invitation.groomName} and ${invitation.brideName} couldn't imagine this day without you there to share in the love, joy, and memories we'll create together at our wedding reception.`;
  };

  return (
    <section className="py-16 px-6 md:px-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h2 className="font-display text-4xl md:text-5xl text-deep-sage mb-8">
          Welcome, {guest.firstName}!
        </h2>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-sage/20">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 font-light">
            {getPersonalizedMessage(guest)}
          </p>
        </div>
      </div>
    </section>
  );
}