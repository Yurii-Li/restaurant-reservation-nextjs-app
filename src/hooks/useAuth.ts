import axios from "axios";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useContext } from "react";
import { deleteCookie } from "cookies-next";

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  const signin = async (
    { email, password }: { email: string; password: string },
    toggleModal: () => void
  ) => {
    setAuthState({ loading: true, data: null, error: null });

    try {
      const response = await axios.post("/api/auth/signin", {
        email,
        password,
      });

      setAuthState({ loading: false, data: response.data, error: null });

      toggleModal();
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

  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    toggleModal: () => void
  ) => {
    setAuthState({ loading: true, data: null, error: null });

    try {
      const response = await axios.post("/api/auth/signup", {
        email,
        password,
        firstName,
        lastName,
        city,
        phone,
      });

      setAuthState({ loading: false, data: response.data, error: null });

      toggleModal();
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

  const signout = () => {
    deleteCookie("jwt");

    setAuthState({ loading: false, data: null, error: null });
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
