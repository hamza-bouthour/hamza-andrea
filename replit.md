# Wedding Invitation Website

## Overview

This is a full-stack wedding invitation website built with React, Express, and TypeScript. The application allows couples to create personalized digital wedding invitations with custom details, photo galleries, and RSVP functionality. Guests can view invitation details, browse photo galleries, and submit their RSVP responses through an elegant, mobile-responsive interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui design system for consistent, accessible components
- **Styling**: Tailwind CSS with custom CSS variables for theming, including wedding-specific color palette (blush, sage, cream, champagne, rose-gold)
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript for API development
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development and database implementation for production
- **Schema Validation**: Zod schemas shared between frontend and backend for consistent data validation
- **API Design**: RESTful endpoints for invitations and RSVPs with proper error handling

### Data Models
- **Invitations**: Store wedding details including couple names, reception venue information, date, story text, and photo URLs (ceremony fields removed - reception only)
- **RSVPs**: Guest responses with attendance status, guest count, and optional messages
- **Users**: Basic user authentication structure (prepared for future auth implementation)

### Recent Changes (January 2025)
- Removed all ceremony-related fields from invitation schema (ceremonyTime, ceremonyVenue, ceremonyAddress)
- Updated UI to focus only on reception details with centered layout
- Simplified invitation flow to reception-only event

### Authentication & Security
- Session-based authentication architecture prepared with connect-pg-simple for PostgreSQL session storage
- CORS and security headers configured for production deployment
- Input validation on both client and server sides using Zod schemas

### Development & Build Process
- **Development**: Hot module replacement with Vite dev server
- **Production**: Static asset generation with Express serving both API and frontend
- **Database Migrations**: Drizzle Kit for schema management and migrations
- **Type Safety**: Shared TypeScript types between frontend and backend through workspace structure

### Performance Optimizations
- React Query for intelligent caching and background updates
- Image optimization with responsive loading
- CSS-in-JS avoided in favor of utility-first Tailwind for better performance
- Lazy loading and code splitting ready for implementation

## External Dependencies

### Core Framework Dependencies
- **React**: UI library with hooks and modern features
- **Express**: Node.js web framework for API development
- **TypeScript**: Type safety across the entire stack

### Database & ORM
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver for cloud deployment
- **drizzle-orm**: Type-safe PostgreSQL ORM with schema validation
- **drizzle-zod**: Integration between Drizzle and Zod for schema validation

### UI & Styling
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Modern icon library

### Form Handling & Validation
- **react-hook-form**: Performant forms with minimal re-renders
- **@hookform/resolvers**: Integration with validation libraries
- **zod**: TypeScript-first schema validation

### State Management & API
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing for React applications

### Development & Build Tools
- **vite**: Fast build tool and dev server
- **@vitejs/plugin-react**: React integration for Vite
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error handling for Replit environment

### Date & Utility Libraries
- **date-fns**: Modern date utility library
- **clsx**: Utility for constructing className strings
- **nanoid**: URL-safe unique ID generator

### Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions