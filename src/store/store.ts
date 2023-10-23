import { atom } from "jotai";

export enum AuthStatus {
	Unauthenticated = "unauthenticated",
	Authenticated = "authenticated",
	Loading = "loading",
	Error = "error",
}

interface IUser {
	id: number;
	username: string;
	role: string | null;
}

interface IAuthAtom {
	user: IUser;	
	token: string;
	status: AuthStatus;
}

export const authAtom = atom<IAuthAtom>({
	user: {
		id: 0,
		username: "",
		role: null,
	},
	token: "",
	status: AuthStatus.Unauthenticated,
});
