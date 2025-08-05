import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const invitations = pgTable("invitations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  groomName: text("groom_name").notNull(),
  brideName: text("bride_name").notNull(),
  weddingDate: text("wedding_date").notNull(),
  receptionTime: text("reception_time").notNull(),
  receptionVenue: text("reception_venue").notNull(),
  receptionAddress: text("reception_address").notNull(),
  storyText: text("story_text"),
  proposalText: text("proposal_text"),
  dressCode: text("dress_code"),
  rsvpDeadline: text("rsvp_deadline"),
  photos: json("photos").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const guests = pgTable("guests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invitationId: varchar("invitation_id").notNull().references(() => invitations.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  siblingsInvited: text("siblings_invited"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const rsvps = pgTable("rsvps", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invitationId: varchar("invitation_id").notNull().references(() => invitations.id),
  guestId: varchar("guest_id").references(() => guests.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  attending: boolean("attending").notNull(),
  guestCount: integer("guest_count").notNull().default(1),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertInvitationSchema = createInsertSchema(invitations).omit({
  id: true,
  createdAt: true,
});

export const insertGuestSchema = createInsertSchema(guests).omit({
  id: true,
  createdAt: true,
});

export const insertRsvpSchema = createInsertSchema(rsvps).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertInvitation = z.infer<typeof insertInvitationSchema>;
export type Invitation = typeof invitations.$inferSelect;
export type InsertGuest = z.infer<typeof insertGuestSchema>;
export type Guest = typeof guests.$inferSelect;
export type InsertRsvp = z.infer<typeof insertRsvpSchema>;
export type Rsvp = typeof rsvps.$inferSelect;
