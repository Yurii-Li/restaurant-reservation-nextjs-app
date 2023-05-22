"use client"

import {useState} from "react";

export default function LoginModal({isSignin}: { isSignin: boolean }) {

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
            <h2>Hello</h2>


          </div>
        </div>
      )}

    </>
  )
}
