import axios from "axios";
import {AuthenticationContext} from "@/app/context/AuthContext";
import {useContext} from "react";

const useAuth = () => {

  const {data, loading, error, setAuthState} = useContext(AuthenticationContext)

  const signin = async ({email, password}: { email: string, password: string }, toggleModal: () => void) => {

    setAuthState({loading: true, data: null, error: null})

    try {
      const response = await axios.post('/api/auth/signin', {email, password})

      setAuthState({loading: false, data: response.data, error: null})

      toggleModal()

    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        setAuthState({loading: false, data: null, error: e.response.data.errorMessage})
      } else {
        setAuthState({loading: false, data: null, error: String(e)})
      }
    }

  }

  const signup = async () => {
  }


  return {
    signin,
    signup
  }

}


export default useAuth
