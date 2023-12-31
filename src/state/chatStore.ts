import { Models } from "appwrite";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type States = {
  chats: Array<Models.Document> | [];
};

type Actions = {
  addChat: (data: Models.Document) => void;
  setChat: (data: Array<Models.Document>) => void;
  deleteChat: (id: string) => void;
  clearChats: () => void;
};

export const chatStore = create<States & Actions>()(
  devtools((set) => ({
    chats: [],
    addChat: (data: Models.Document) =>
      set((state) => ({
        chats: [...state.chats, data],
      })),
    setChat: (data: Array<Models.Document>) =>
      set(() => ({
        chats: data,
      })),
    clearChats: () =>
      set(() => ({
        chats: [],
      })),
    deleteChat: (id: string) =>
      set((state) => ({
        chats: state.chats.filter((item) => item.$id !== id),
      })),
  }))
);
