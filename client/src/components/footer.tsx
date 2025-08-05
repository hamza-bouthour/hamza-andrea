import { Instagram, Facebook, Mail } from "lucide-react";
import type { Invitation } from "@shared/schema";

interface FooterProps {
  invitation: Invitation;
}

export default function Footer({ invitation }: FooterProps) {
  return (
    <footer className="bg-deep-sage text-white py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h3 className="font-script text-4xl text-champagne mb-2">
            {invitation.groomName} & {invitation.brideName}
          </h3>
          <p className="text-sage/70">{invitation.weddingDate} • {invitation.receptionVenue}</p>
        </div>
        
        <div className="border-t border-sage/30 pt-8">
          <p className="text-sage/50 text-sm">
            Made with 💕 for our special day
          </p>
        </div>
      </div>
    </footer>
  );
}
