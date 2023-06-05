"use client";

import { ChangeEvent, useContext, useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { AuthModalInputs } from "@/app/components/AuthModalInputs";

export function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [modal, setModal] = useState(false);

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: "",
  });

  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (isSignin) {
      if (inputs.email && inputs.password) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.phone &&
        inputs.city &&
        inputs.password
      ) {
        return setDisabled(false);
      }
    }

    setDisabled(true);
  }, [inputs]);

  const { signin, signup } = useAuth();

  const { error, loading } = useContext(AuthenticationContext);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [modal]);

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent;
  };

  const handleClick = () => {
    if (isSignin) {
      signin({ email: inputs.email, password: inputs.password }, toggleModal);
    } else {
      signup(inputs, toggleModal);
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className={`${renderContent(
          "bg-blue-400 text-white mr-3",
          ""
        )} border p-1 px-4 rounded `}
      >
        {renderContent("Sign in", "Sign up")}
      </button>

      {modal && (
        <div
          className={"w-screen h-screen top-0 right-0 bottom-0 left-0 fixed"}
        >
          <div
            onClick={toggleModal}
            className={
              "w-screen h-screen top-0 right-0 bottom-0 left-0 fixed bg-gray-950/80"
            }
          ></div>
          <div
            className={
              " absolute top-[50%] left-[50%]  -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded max-w-2xl min-w-[300px] "
            }
          >
            <div className={"p-2"}>
              <div
                className={"uppercase font-bold text-center pb-2 border-b mb-2"}
              >
                <p className={"text-sm"}>
                  {renderContent("Sign In", "Create Account")}
                </p>
              </div>

              <div className={"m-auto"}>
                <h2 className={"text-2xl font-light text-center"}>
                  {renderContent(
                    "Login Into Your Account ",
                    "Create Your OpenTable Account"
                  )}
                </h2>

                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInput={handleChangeInput}
                  isSignin={isSignin}
                />

                {loading ? (
                  <div className={" flex justify-center items-center"}>
                    <div className="w-12 h-12 border-[5px] border-b-red-600 rounded-full inline-block animate-spin"></div>
                  </div>
                ) : (
                  <button
                    disabled={disabled}
                    className={
                      "uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                    }
                    onClick={handleClick}
                  >
                    {renderContent("Sign In", "Sign Up")}
                  </button>
                )}

                {error && (
                  <div
                    className={
                      "bg-red-500 text-white text-sm p-2 rounded  mb-5"
                    }
                  >
                    !!! {error}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
