import { User } from "@/generated/graphql-types";
import { create, StoreApi, UseBoundStore } from "zustand";

interface StoreState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const createUserStore = (initialUser: User | null) =>
  create<StoreState>()((set) => ({
    user: initialUser,
    setUser: (user) => set({ user }),
  }));

// This is a function that creates the store, not the store itself
export let useUserStore: UseBoundStore<StoreApi<StoreState>>;

// This function will be called to initialize the store
export const initializeUserStore = (initialUser: User | null) => {
  useUserStore = createUserStore(initialUser);
};
