import type { Invitation } from "@shared/schema";

interface StorySectionProps {
  invitation: Invitation;
}

export default function StorySection({ invitation }: StorySectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-deep-sage mb-4">Our Love Story</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blush to-sage mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <img 
              src={invitation.photos[1]} 
              alt={`${invitation.groomName} and ${invitation.brideName} - Romantic couple walking together`}
              className="rounded-2xl shadow-2xl w-full image-hover"
              style={{
                filter: 'brightness(1.05) contrast(1.02) saturate(1.05)',
                aspectRatio: '4/3',
                objectFit: 'cover'
              }}
            />
          </div>
          
          <div className="animate-slide-up delay-200">
            <div className="space-y-6">
              <div className="bg-cream p-6 rounded-xl">
                <h3 className="font-display text-2xl font-semibold text-deep-sage mb-3">How We Met</h3>
                <p className="text-gray-600 leading-relaxed">
                  {invitation.storyText || "Our paths crossed in the most beautiful way, and from that moment, we knew we were meant to be together."}
                </p>
              </div>
              
              <div className="bg-champagne p-6 rounded-xl">
                <h3 className="font-display text-2xl font-semibold text-deep-sage mb-3">The Proposal</h3>
                <p className="text-gray-600 leading-relaxed">
                  {invitation.proposalText || "In a moment filled with love and joy, we decided to spend the rest of our lives together."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
