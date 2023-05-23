"use client"

import {useState} from "react";
import AuthModalInputs from "@/app/components/AuthModalInputs";

export default function AuthModal({isSignin}: { isSignin: boolean }) {

  const [modal, setModal] = useState(false)

  const toggleModal = () => {
    setModal(!modal)
  }

  if (modal) {
    document.body.classList.add("overflow-hidden")
  } else {
    document.body.classList.remove("overflow-hidden")
  }

  const renderContent = (signinContent: string, signupContent: string) => {
    return isSignin ? signinContent : signupContent
  }

  return (
    <>
      <button onClick={toggleModal}
              className={`${renderContent("bg-blue-400 text-white mr-3", "")} border p-1 px-4 rounded `}
      >
        {renderContent("Sign in", "Sign up")}
      </button>

      {modal && (
        <div className={"w-screen h-screen top-0 right-0 bottom-0 left-0 fixed"}>
          <div onClick={toggleModal}
               className={"w-screen h-screen top-0 right-0 bottom-0 left-0 fixed bg-gray-950/80"}></div>
          <div
            className={"absolute top-[40%] left-[50%]  -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded max-w-2xl min-w-[300px] "}>

            <div className={"p-2"}>
              <div className={"uppercase font-bold text-center pb-2 border-b mb-2"}>
                <p className={"text-sm"}>
                  {renderContent("Sign In", "Create Account")}
                </p>
              </div>

              <div className={"m-auto"}>
                <h2 className={"text-2xl font-light text-center"}>
                  {renderContent("Login Into Your Account ", "Create Your OpenTable Account")}
                </h2>

                <AuthModalInputs />

                <button className={"uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"}>
                  {renderContent("Sign In", "Sign Up")}
                </button>

              </div>

            </div>


          </div>
        </div>
      )}

    </>
  )
}
