import { FieldErrors, UseFormRegister } from "react-hook-form";

import { IAuthFormInputs } from "@/interfaces/auth.interface";

interface IProps {
  register: UseFormRegister<IAuthFormInputs>;
  isSignin: boolean;
  errors: FieldErrors<IAuthFormInputs>;
}

export function AuthModalInputs({ register, isSignin, errors }: IProps) {
  return (
    <>
      {!isSignin && (
        <div className={"my-3 flex justify-between text-sm"}>
          <div className={"flex flex-col w-[49%]"}>
            <input
              type={"text"}
              className={"border rounded p-2 py-3 "}
              placeholder={"First Name"}
              {...register("firstName")}
            />
            {errors.firstName && (
              <div className={"text-red-500 text-xs"}>
                {errors.firstName.message}
              </div>
            )}
          </div>

          <div className={"flex flex-col w-[49%]"}>
            <input
              type={"text"}
              className={"border rounded p-2 py-3"}
              placeholder={"Last Name"}
              {...register("lastName")}
            />
            {errors.lastName && (
              <div className={"text-red-500 text-xs"}>
                {errors.lastName.message}
              </div>
            )}
          </div>
        </div>
      )}

      <div className={"my-3 flex flex-col justify-between text-sm"}>
        <input
          type={"text"}
          className={"border rounded p-2 py-3 w-full"}
          placeholder={"Email"}
          {...register("email")}
        />
        {errors.email && (
          <div className={"text-red-500 text-xs"}>{errors.email.message}</div>
        )}
      </div>

      {!isSignin && (
        <div className={"my-3 flex justify-between text-sm"}>
          <div className={"flex flex-col w-[49%]"}>
            <input
              type={"text"}
              className={"border rounded p-2 py-3"}
              placeholder={"Phone"}
              {...register("phone")}
            />
            {errors.phone && (
              <div className={"text-red-500 text-xs"}>
                {errors.phone.message}
              </div>
            )}
          </div>

          <div className={"flex flex-col w-[49%]"}>
            <input
              type={"text"}
              className={"border rounded p-2 py-3"}
              placeholder={"City"}
              {...register("city")}
            />
            {errors.city && (
              <div className={"text-red-500 text-xs"}>
                {errors.city.message}
              </div>
            )}
          </div>
        </div>
      )}

      <div className={"my-3 flex flex-col justify-between text-sm"}>
        <input
          type={"password"}
          className={"border rounded p-2 py-3 w-full"}
          placeholder={"Password"}
          {...register("password")}
        />
        {errors.password && (
          <div className={"text-red-500 text-xs"}>
            {errors.password.message}
          </div>
        )}
      </div>
    </>
  );
}
