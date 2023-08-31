"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getCookie } from "cookies-next";
import axios from "axios";

interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface IState {
  loading: boolean;
  data: IUser | null;
  error: string | null;
}

interface IAuthState extends IState {
  setAuthState: Dispatch<SetStateAction<IState>>;
}

export const AuthenticationContext = createContext<IAuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});
export default function AuthContext({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<IState>({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState({ loading: true, data: null, error: null });

    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        return setAuthState({ loading: false, data: null, error: null });
      }

      const response = await axios.get("/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({ loading: false, data: response.data, error: null });
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        setAuthState({
          loading: false,
          data: null,
          error: e.response.data.errorMessage,
        });
      } else {
        setAuthState({ loading: false, data: null, error: String(e) });
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        ...authState,
        setAuthState,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}
