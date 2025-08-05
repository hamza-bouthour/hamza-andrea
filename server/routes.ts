import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertRsvpSchema, insertGuestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get invitation by username
  app.get("/api/invitations/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const invitation = await storage.getInvitationByUsername(username);
      
      if (!invitation) {
        return res.status(404).json({ message: "Invitation not found" });
      }
      
      res.json(invitation);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch invitation" });
    }
  });

  // Get guest by name for invitation
  app.get("/api/invitations/:username/guests/:firstName", async (req, res) => {
    try {
      const { username, firstName } = req.params;
      const invitation = await storage.getInvitationByUsername(username);
      
      if (!invitation) {
        return res.status(404).json({ message: "Invitation not found" });
      }
      
      const guest = await storage.getGuestByName(invitation.id, firstName);
      
      if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
      }
      
      res.json(guest);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch guest" });
    }
  });

  // Get all guests for an invitation
  app.get("/api/invitations/:username/guests", async (req, res) => {
    try {
      const { username } = req.params;
      const invitation = await storage.getInvitationByUsername(username);
      
      if (!invitation) {
        return res.status(404).json({ message: "Invitation not found" });
      }
      
      const guests = await storage.getGuestsByInvitation(invitation.id);
      res.json(guests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch guests" });
    }
  });

  // Create RSVP
  app.post("/api/rsvps", async (req, res) => {
    try {
      const validatedData = insertRsvpSchema.parse(req.body);
      const rsvp = await storage.createRsvp(validatedData);
      res.status(201).json(rsvp);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid RSVP data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create RSVP" });
    }
  });

  // Get RSVPs for an invitation
  app.get("/api/invitations/:username/rsvps", async (req, res) => {
    try {
      const { username } = req.params;
      const invitation = await storage.getInvitationByUsername(username);
      
      if (!invitation) {
        return res.status(404).json({ message: "Invitation not found" });
      }
      
      const rsvps = await storage.getRsvpsByInvitation(invitation.id);
      res.json(rsvps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch RSVPs" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
