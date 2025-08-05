import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Loader2 } from "lucide-react";
import type { Invitation, Guest } from "@shared/schema";

import HeroSection from "@/components/hero-section";
import StorySection from "@/components/story-section";
import GallerySection from "@/components/gallery-section";
import DetailsSection from "@/components/details-section";
import RsvpSection from "@/components/rsvp-section";
import Footer from "@/components/footer";
import PersonalizedSection from "@/components/personalized-section";
import GuestListSection from "@/components/guest-list-section";

interface InvitationPageProps {
  params?: { username?: string; guestName?: string };
}

export default function InvitationPage({ params }: InvitationPageProps) {
  const routeParams = useParams();
  const username = "hamza-andrea"; // Always use the main invitation
  const guestName = params?.guestName || routeParams.guestName;

  const { data: invitation, isLoading, error } = useQuery<Invitation>({
    queryKey: ["/api/invitations", username],
  });

  const { data: guest } = useQuery<Guest>({
    queryKey: ["/api/invitations", username, "guests", guestName],
    enabled: !!guestName,
  });

  const { data: guestList } = useQuery<Guest[]>({
    queryKey: ["/api/invitations", username, "guests"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-deep-sage mx-auto mb-4" />
          <p className="text-deep-sage font-display text-xl">Loading your invitation...</p>
        </div>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-deep-sage mb-4">Invitation Not Found</h1>
          <p className="text-gray-600">The invitation you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-body text-gray-800 bg-cream">
      <HeroSection invitation={invitation} />
      {guestName && guest && (
        <PersonalizedSection guest={guest} invitation={invitation} />
      )}
      <StorySection invitation={invitation} />
      <GallerySection photos={invitation.photos} />
      <DetailsSection invitation={invitation} />
      <GuestListSection guests={guestList || []} />
      <RsvpSection invitation={invitation} />
      <Footer invitation={invitation} />
    </div>
  );
}
