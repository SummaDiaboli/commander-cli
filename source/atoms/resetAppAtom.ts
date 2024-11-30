import {atom} from 'jotai';

export const appKeyAtom = atom<number>(Date.now());
