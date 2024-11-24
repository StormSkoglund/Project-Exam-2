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
