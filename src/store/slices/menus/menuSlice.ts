import {create} from 'zustand';

export const useMenusStore = create<any>((set: any) => ({
    menus: [],
    setMenus: (data: any) => set({ menus: data }),
}));