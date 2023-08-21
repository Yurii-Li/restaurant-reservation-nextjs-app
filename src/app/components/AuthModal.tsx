"use client";

import { useContext, useEffect, useState } from "react";

import useAuth from "@/hooks/useAuth";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { AuthModalInputs } from "@/app/components/AuthModalInputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { signInValidator, signUpValidator } from "@/validators";
import { IAuthFormInputs } from "@/interfaces/auth.interface";

export function AuthModal({ isSignin }: { isSignin: boolean }) {
  const [modal, setModal] = useState(false);

  const { signin, signup } = useAuth();

  const { error: apiError, loading } = useContext(AuthenticationContext);

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IAuthFormInputs>({
    mode: "all",
    resolver: isSignin
      ? joiResolver(signInValidator)
      : joiResolver(signUpValidator),
  });

  const handleClick: SubmitHandler<IAuthFormInputs> = (data) => {
    if (isSignin) {
      signin({ email: data.email, password: data.password }, toggleModal);
    } else {
      signup(data, toggleModal);
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className={`${renderContent(
          "bg-blue-400 text-white mr-3",
          "",
        )} border p-1 px-4 rounded `}
      >
        {renderContent("Sign in", "Sign up")}
      </button>

      {modal && (
        <div
          className={
            "w-screen h-screen top-0 right-0 bottom-0 left-0 fixed z-10"
          }
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
                    "Create Your OpenTable Account",
                  )}
                </h2>

                <form onSubmit={handleSubmit(handleClick)}>
                  <AuthModalInputs
                    register={register}
                    isSignin={isSignin}
                    errors={errors}
                  />

                  {loading ? (
                    <div className={" flex justify-center items-center"}>
                      <div className="w-12 h-12 border-[5px] border-b-red-600 rounded-full inline-block animate-spin"></div>
                    </div>
                  ) : (
                    <button
                      className={
                        "uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
                      }
                      disabled={!isValid}
                    >
                      {renderContent("Sign In", "Sign Up")}
                    </button>
                  )}
                </form>
                {apiError && (
                  <div
                    className={
                      "bg-red-500 text-white text-sm p-2 rounded  mb-5"
                    }
                  >
                    !!! {apiError}
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
