import create from 'zustand';

type ItemListStore = {
    deleteConfirmation: boolean
    selectedItem: string
    toggleDeleteConfirmation: (confirmation: boolean) => void
    setSelectedItem: (productId: string) => void
}

export const useDeleteStore = create<ItemListStore>((set) => ({
    deleteConfirmation: false,
    selectedItem: '',
    toggleDeleteConfirmation: (confirmation) => set({ deleteConfirmation: confirmation }),
    setSelectedItem: (itemId) => set({ selectedItem: itemId }),
}));
