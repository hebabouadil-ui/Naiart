"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/** Editable artist profile shown on the About page. Persisted in the browser
 *  so changes made in the admin take effect immediately, with no database. */
export interface ArtistProfile {
  name: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  portrait: string;
  bio: string[];
}

export const DEFAULT_PROFILE: ArtistProfile = {
  name: "Rabia Nainia",
  tagline: "Painter · Arles, Provence",
  heroTitle: "The hand\nbehind the light",
  heroSubtitle:
    "Oil and cold wax on linen — from the atelier in Arles, where the eastern windows throw long blades of gold across the floor each morning.",
  portrait:
    "https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&h=1125&q=85&fit=crop&auto=format",
  bio: [
    "I was born between the salt marshes of the Camargue and the print studios of Marseille, raised on the particular silver of southern light and the smell of ink drying on paper. For years I trained as an architect, learning to love structure — but it was always the feeling held inside a building, not the building, that moved me. Painting was where that feeling finally had somewhere to go.",
    "For more than fifteen years I have worked in oil and cold wax, a slow and sculptural language that refuses to be rushed. Each canvas is built in layers — applied, scraped back, polished, and broken again — until the surface begins to hold light the way skin does: softly, unevenly, alive. A single painting may take forty mornings. The waiting is not lost time; it is the time in which the work decides what it wants to become.",
    "My philosophy is simple and unfashionable: a painting should give more the longer you live with it. I am not interested in the image you see across a room, but in the one that reveals itself on a quiet afternoon, years later. From my atelier in Arles — a converted printworks flooded with morning sun — I make work for people who want to keep looking.",
  ],
};

interface ContentState {
  profile: ArtistProfile;
  /** Has the persisted store finished hydrating from localStorage? */
  hydrated: boolean;
  setProfile: (patch: Partial<ArtistProfile>) => void;
  reset: () => void;
}

export const useSiteContent = create<ContentState>()(
  persist(
    (set) => ({
      profile: DEFAULT_PROFILE,
      hydrated: false,
      setProfile: (patch) =>
        set((s) => ({ profile: { ...s.profile, ...patch } })),
      reset: () => set({ profile: DEFAULT_PROFILE }),
    }),
    {
      name: "naiart:site-content",
      partialize: (s) => ({ profile: s.profile }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);
