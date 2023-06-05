import { ChangeEvent } from "react";

interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  isSignin: boolean;
}

export function AuthModalInputs({
  inputs,
  handleChangeInput,
  isSignin,
}: Props) {
  return (
    <>
      {!isSignin && (
        <div className={"my-3 flex justify-between text-sm"}>
          <input
            type={"text"}
            className={"border rounded p-2 py-3 w-[49%]"}
            value={inputs.firstName}
            placeholder={"First Name"}
            onChange={handleChangeInput}
            name={"firstName"}
          />

          <input
            type={"text"}
            className={"border rounded p-2 py-3 w-[49%]"}
            value={inputs.lastName}
            placeholder={"Last Name"}
            onChange={handleChangeInput}
            name={"lastName"}
          />
        </div>
      )}

      <div className={"my-3 flex justify-between text-sm"}>
        <input
          type={"text"}
          className={"border rounded p-2 py-3 w-full"}
          value={inputs.email}
          placeholder={"Email"}
          onChange={handleChangeInput}
          name={"email"}
        />
      </div>

      {!isSignin && (
        <div className={"my-3 flex justify-between text-sm"}>
          <input
            type={"text"}
            className={"border rounded p-2 py-3 w-[49%]"}
            value={inputs.phone}
            placeholder={"Phone"}
            onChange={handleChangeInput}
            name={"phone"}
          />

          <input
            type={"text"}
            className={"border rounded p-2 py-3 w-[49%]"}
            value={inputs.city}
            placeholder={"City"}
            onChange={handleChangeInput}
            name={"city"}
          />
        </div>
      )}

      <div className={"my-3 flex justify-between text-sm"}>
        <input
          type={"password"}
          className={"border rounded p-2 py-3 w-full"}
          value={inputs.password}
          placeholder={"Password"}
          onChange={handleChangeInput}
          name={"password"}
        />
      </div>
    </>
  );
}
