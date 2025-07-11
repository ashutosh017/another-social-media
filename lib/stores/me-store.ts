import { createStore } from "zustand/vanilla";
import { User } from "@/app/generated/prisma";

export type meState = Omit<User, "password"> | null;
export type meActions = {
  setMe: () => void;
};
export const defaultInitialState: meState = null;

export type meStore = meState & meActions;
export const createMeStore = (initState: meState = defaultInitialState) => {
  return createStore<meStore>();
};
