"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  name: string;
  email: string;
  role: "customer" | "admin";
}

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (name: string, email: string, password: string) => { ok: boolean };
  logout: () => void;
}

/**
 * Demo authentication. In production this is replaced by NextAuth with a
 * Prisma adapter and JWT sessions. The admin credentials below stand in for a
 * seeded Super Admin account.
 */
export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        const e = email.trim().toLowerCase();
        if (e === "admin@naiart.com" && password === "atelier") {
          set({ user: { name: "Naïa Lemaire", email: e, role: "admin" } });
          return { ok: true };
        }
        if (e && password.length >= 4) {
          set({
            user: {
              name: e.split("@")[0].replace(/\W/g, " "),
              email: e,
              role: "customer",
            },
          });
          return { ok: true };
        }
        return { ok: false, error: "Invalid credentials." };
      },
      register: (name, email) => {
        set({
          user: { name, email: email.trim().toLowerCase(), role: "customer" },
        });
        return { ok: true };
      },
      logout: () => set({ user: null }),
    }),
    { name: "naiart-auth" },
  ),
);
