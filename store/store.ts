import create, { GetState, SetState } from "zustand";
import { persist } from "zustand/middleware";
import { createCartItemsSlice } from "./slices/cartItemsSlice";

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
  ...createCartItemsSlice(set, get),
});

export const useStore = create(
  persist(createRootSlice, {
    name: "general-storage",
  })
);
