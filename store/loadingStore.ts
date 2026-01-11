import { create } from "zustand";
type LoadingState = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  setLoading: (loadingState) => set({ isLoading: loadingState }),
}));
