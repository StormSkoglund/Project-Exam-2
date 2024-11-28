import { create } from "zustand";

export interface Dataset extends Record<string, unknown> {
  id: string;
  name: string;
  media: { url: string; alt: string }[];
}

interface ApiState {
  data: Dataset[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  setData: (data: Dataset[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setErrorMessage: (message: string | null) => void;
}

export const useApiStore = create<ApiState>((set) => ({
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
  setData: (data) => set({ data }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsError: (isError) => set({ isError }),
  setErrorMessage: (message) => set({ errorMessage: message }),
}));

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
  bio?: string;
  avatar?: { url?: string; alt?: string } | null;
  banner?: { url?: string; alt?: string } | null;
  venueManager: boolean;
}

interface UserState {
  user: Partial<Omit<User, "password">> | null;
  isLoggedIn: boolean;
  accessToken: string | null;
  setUser: (user: Partial<Omit<User, "password">>) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

interface StoreState extends ModalState, UserState {}

const useMyStore = create<StoreState>((set) => ({
  openLoginModal: false,
  openRegisterModal: false,
  handleOpenLogin: () => set({ openLoginModal: true }),
  handleCloseLogin: () => set({ openLoginModal: false }),
  handleOpenRegister: () => set({ openRegisterModal: true }),
  handleCloseRegister: () => set({ openRegisterModal: false }),

  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn") || "false"),
  accessToken: localStorage.getItem("accessToken") || null,
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  setIsLoggedIn: (isLoggedIn) => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    set({ isLoggedIn });
  },
  setAccessToken: (token) => {
    console.log("Setting accessToken to localStorage:", token);
    localStorage.setItem("accessToken", token);
    set({ accessToken: token });
  },
  logout: () => {
    console.log("Logging out and removing items from localStorage");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("accessToken");
    set({ user: null, isLoggedIn: false, accessToken: null });
  },
}));

export default useMyStore;
