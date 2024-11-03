import { create } from "zustand";

export interface User {
  name: string;
  email: string;
  password: string;
  avatar: {
    url: string;
    alt: string;
  };
  venueManager: boolean;
}

const useStore = create<{
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  setUser: (user: User) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setAccessToken: (token: string) => void;
}>((set) => ({
  user: null,
  isLoggedIn: false,
  accessToken: null,
  setUser: (user) => set({ user }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setAccessToken: (token) => set({ accessToken: token }),
}));

export default useStore;
