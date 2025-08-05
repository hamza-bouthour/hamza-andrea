import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Heart, Instagram, Facebook, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Invitation } from "@shared/schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const rsvpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  attending: z.enum(["true", "false"], { required_error: "Please select if you'll be attending" }),
  guestCount: z.string().min(1, "Please select number of guests"),
  message: z.string().optional(),
});

type RsvpFormData = z.infer<typeof rsvpSchema>;

interface RsvpSectionProps {
  invitation: Invitation;
}

export default function RsvpSection({ invitation }: RsvpSectionProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<RsvpFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      attending: undefined,
      guestCount: "1",
      message: "",
    },
  });

  const rsvpMutation = useMutation({
    mutationFn: async (data: RsvpFormData) => {
      return apiRequest("POST", "/api/rsvps", {
        invitationId: invitation.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        attending: data.attending === "true",
        guestCount: parseInt(data.guestCount),
        message: data.message || null,
      });
    },
    onSuccess: () => {
      toast({
        title: "RSVP Submitted!",
        description: "Thank you for your response. We can't wait to celebrate with you!",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/invitations", invitation.username, "rsvps"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit RSVP. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: RsvpFormData) => {
    rsvpMutation.mutate(data);
  };

  return (
    <section className="py-20 gradient-bg">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-deep-sage mb-4">RSVP</h2>
          <p className="text-gray-600 text-lg">We can't wait to celebrate with you!</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blush to-sage mx-auto mt-4"></div>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-deep-sage">First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-deep-sage">Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-deep-sage">Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="attending"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-deep-sage">Will you be attending?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="attending-yes" />
                          <Label htmlFor="attending-yes">Yes, I'll be there! 💕</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="attending-no" />
                          <Label htmlFor="attending-no">Sorry, can't make it 😢</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-deep-sage">Number of Guests</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select number of guests" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Just me</SelectItem>
                        <SelectItem value="2">Me + 1</SelectItem>
                        <SelectItem value="3">Me + 2</SelectItem>
                        <SelectItem value="4">Me + 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-deep-sage">Special Message (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your excitement or any special notes..." 
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={rsvpMutation.isPending}
                className="w-full bg-gradient-to-r from-blush to-rose-gold text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Heart className="h-4 w-4 mr-2" />
                {rsvpMutation.isPending ? "Sending..." : "Send RSVP"}
              </Button>
            </form>
          </Form>
          
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm mb-4">
              Please RSVP by {invitation.rsvpDeadline}
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-blush hover:text-rose-gold transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-sage hover:text-deep-sage transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-rose-gold hover:text-blush transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
