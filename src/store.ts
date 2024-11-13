import { create } from "zustand";

interface ModalState {
  openLoginModal: boolean;
  openRegisterModal: boolean;
  handleOpenLogin: () => void;
  handleCloseLogin: () => void;
  handleOpenRegister: () => void;
  handleCloseRegister: () => void;
}

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

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  setUser: (user: User) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setAccessToken: (token: string) => void;
}

interface StoreState extends ModalState, UserState {}

const useMyStore = create<StoreState>((set) => ({
  openLoginModal: false,
  openRegisterModal: false,
  handleOpenLogin: () => set({ openLoginModal: true }),
  handleCloseLogin: () => set({ openLoginModal: false }),
  handleOpenRegister: () => set({ openRegisterModal: true }),
  handleCloseRegister: () => set({ openRegisterModal: false }),

  user: null,
  isLoggedIn: false,
  accessToken: null,
  setUser: (user) => set({ user }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setAccessToken: (token) => set({ accessToken: token }),
}));

export default useMyStore;
