import {create} from "zustand";

type AddStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useAdd = create<AddStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));
