import { Models } from "appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type States = {
  isDataFetched: boolean;
  communities: Array<Models.Document> | [];
};

type Actions = {
  addCommunity: (data: Models.Document) => void;
  setCommunity: (data: Array<Models.Document>) => void;
};

export const communityStore = create<States & Actions>()(
  devtools((set) => ({
    communities: [],
    isDataFetched: false,
    addCommunity: (data: Models.Document) =>
      set((state) => ({
        communities: [data, ...state.communities],
      })),

    setCommunity: (data: Array<Models.Document>) =>
      set(() => ({
        isDataFetched: true,
        communities: data,
      })),
  }))
);
