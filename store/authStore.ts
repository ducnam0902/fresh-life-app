import { deleteItemAsync, getItem, setItem } from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserProps = {
  id: number;
  name: string;
  email: string;
  avatar: string;
};
type UserState = {
  userInfo: UserProps | null;
  setUser: (user: UserProps | null) => void;
};

export const useAuthStore = create(
  persist<UserState>(
    (set) => ({
      userInfo: null,
      setUser: (userInfo: UserProps | null) =>
        set(() => ({ userInfo: userInfo })),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        setItem,
        getItem,
        removeItem: deleteItemAsync,
      })),
    }
  )
);
