import {
  type User,
  type InsertUser,
  type Invitation,
  type InsertInvitation,
  type Guest,
  type InsertGuest,
  type Rsvp,
  type InsertRsvp,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  getInvitationByUsername(username: string): Promise<Invitation | undefined>;
  createInvitation(invitation: InsertInvitation): Promise<Invitation>;
  updateInvitation(
    username: string,
    invitation: Partial<InsertInvitation>,
  ): Promise<Invitation | undefined>;

  createGuest(guest: InsertGuest): Promise<Guest>;
  getGuestsByInvitation(invitationId: string): Promise<Guest[]>;
  getGuestByName(invitationId: string, firstName: string): Promise<Guest | undefined>;

  createRsvp(rsvp: InsertRsvp): Promise<Rsvp>;
  getRsvpsByInvitation(invitationId: string): Promise<Rsvp[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private invitations: Map<string, Invitation>;
  private guests: Map<string, Guest>;
  private rsvps: Map<string, Rsvp>;

  constructor() {
    this.users = new Map();
    this.invitations = new Map();
    this.guests = new Map();
    this.rsvps = new Map();

    // Create sample invitation data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleInvitation: Invitation = {
      id: randomUUID(),
      username: "hamza-andrea",
      groomName: "Hamza",
      brideName: "Andrea",
      weddingDate: "Saturday, Aug 22nd, 2025",
      receptionTime: "6:00 PM - 11:00 PM",
      receptionVenue: "The Social Studio",
      receptionAddress: "3520 Seagate Way\nOceanside, CA 92056",
      storyText:
        "Our paths crossed on a beautiful spring morning at the local Walmart in Escondido. Hamza was searching for the perfect spices for his pasta, while Andrea was looking for fresh ingredients for a special dinner. A chance encounter over the most beautiful peonies led to our first conversation.",
      proposalText:
        "Two years later, Hamza planned the most romantic surprise at the same Walmart market where we first met, he got down on one knee and asked Andrea to be his forever.",
      dressCode: "Cocktail Attire - Garden Party Elegant",
      rsvpDeadline: "Aug 15th, 2025",
      photos: [
        "/attached_assets/04b3ffcc-a37c-4442-85c8-c1d1d59533db_1754427804317.jpeg",
        "/attached_assets/2e017fa1-b21c-4ac3-b297-7527991d3717_1754427847296.jpeg",
        "/attached_assets/4da7a5e3-9567-4e85-a4c0-a0cc5e22e056_1754427847297.jpeg",
        "/attached_assets/5c0a14dc-24ae-48d6-a81d-7aa3c2d7c7c7_1754427847297.jpeg",
        "/attached_assets/5c58ba37-3836-4212-95bd-2caac37d7514_1754427847297.jpeg",
        "/attached_assets/468a85cc-7581-4bd2-be29-785f443fcc88_1754427847297.jpeg",
        "/attached_assets/bf01c718-0180-4a2c-9d77-4f20ade486be_1754427847297.jpeg",
        "/attached_assets/bg-4_1754427847297.jpeg",
        "/attached_assets/d381c236-bbc9-4830-9a99-ebb2e3d20808_1754427847298.jpeg",
        "/attached_assets/27cd7684-4839-47e8-a75e-67f1a246046e_1754427847298.jpeg"
      ],
      createdAt: new Date(),
    };

    this.invitations.set("hamza-andrea", sampleInvitation);
    
    // Create sample guests
    const guests = [
      {
        id: randomUUID(),
        invitationId: sampleInvitation.id,
        firstName: "Sahar",
        lastName: "Bouthour",
        siblingsInvited: null,
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        invitationId: sampleInvitation.id,
        firstName: "Khoubeib",
        lastName: "Bouthour",
        siblingsInvited: "Soumaya, Skander, Yasmine",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        invitationId: sampleInvitation.id,
        firstName: "Afef",
        lastName: "Triki",
        siblingsInvited: null,
        createdAt: new Date(),
      }
    ];
    
    guests.forEach(guest => {
      this.guests.set(guest.firstName.toLowerCase(), guest);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getInvitationByUsername(
    username: string,
  ): Promise<Invitation | undefined> {
    return this.invitations.get(username);
  }

  async createInvitation(
    insertInvitation: InsertInvitation,
  ): Promise<Invitation> {
    const id = randomUUID();
    const invitation: Invitation = {
      ...insertInvitation,
      id,
      createdAt: new Date(),
    };
    this.invitations.set(insertInvitation.username, invitation);
    return invitation;
  }

  async updateInvitation(
    username: string,
    updates: Partial<InsertInvitation>,
  ): Promise<Invitation | undefined> {
    const existing = this.invitations.get(username);
    if (!existing) return undefined;

    const updated: Invitation = { ...existing, ...updates };
    this.invitations.set(username, updated);
    return updated;
  }

  async createGuest(insertGuest: InsertGuest): Promise<Guest> {
    const id = randomUUID();
    const guest: Guest = { 
      ...insertGuest, 
      id,
      createdAt: new Date()
    };
    this.guests.set(guest.firstName.toLowerCase(), guest);
    return guest;
  }

  async getGuestsByInvitation(invitationId: string): Promise<Guest[]> {
    return Array.from(this.guests.values()).filter(
      (guest) => guest.invitationId === invitationId
    );
  }

  async getGuestByName(invitationId: string, firstName: string): Promise<Guest | undefined> {
    const guest = this.guests.get(firstName.toLowerCase());
    return guest && guest.invitationId === invitationId ? guest : undefined;
  }

  async createRsvp(insertRsvp: InsertRsvp): Promise<Rsvp> {
    const id = randomUUID();
    const rsvp: Rsvp = {
      ...insertRsvp,
      id,
      createdAt: new Date(),
    };
    this.rsvps.set(id, rsvp);
    return rsvp;
  }

  async getRsvpsByInvitation(invitationId: string): Promise<Rsvp[]> {
    return Array.from(this.rsvps.values()).filter(
      (rsvp) => rsvp.invitationId === invitationId,
    );
  }
}

export const storage = new MemStorage();
