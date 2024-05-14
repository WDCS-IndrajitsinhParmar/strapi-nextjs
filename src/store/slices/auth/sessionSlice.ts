import create from 'zustand';

export const initialSessionState = {
  signedIn: false,
  token: null,
};

export const initialUserState = {
    avatar: null,
    email: null,
    userName: null,
    authority: null,
  };

export const useSessionStore = create((set) => ({
  ...initialSessionState,
  signInSuccess: (token:any) => set(() => ({ signedIn: true, token })),
  signOutSuccess: () => set(() => ({ signedIn: false, token: null })),
}));

export const useUserStore = create((set) => ({
  ...initialUserState,
  setUser: (userState:any) => set(() => userState),
}));
