"use client";
import React, { useEffect, useState } from "react";
import FormWrap from "../global/FormWrap";
import Input from "../global/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../global/Heading";
import Button from "../global/Button";
import Link from "next/link";
import { useLocale } from "next-intl";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { IUserMenuProps } from "../UserList";

const RegisterForm = (currentUser: IUserMenuProps) => {
  const locale = useLocale();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    axios
      .post("/api/register/", data)
      .then(() => {
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push(`/${locale}/login`);
            router.refresh();
            toast.success("logged In");
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error("something went wrong"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (currentUser) {
      router.push(`/${locale}/`);
    }
  }, []);
  if (currentUser) {
    return <p className="text-center">You are Logged In, Redirecting ...</p>;
  }
  return (
    <div className="m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrap>
          <Heading title="SignUp For Tia Store" center />
          <Button
            label="Sign up with Google"
            outline
            icon={AiOutlineGoogle}
            onClick={() => {}}
            custom="w-full"
          />
          <hr className="bg-slate-300 w-full h-px" />
          <Input
            id="name"
            label="Name"
            type="text"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="email"
            label="Email"
            type="email"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
          <Input
            id="password"
            type="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <Button label={isLoading ? "Loading" : "SignUp"} custom="w-[200px]" />
          <p className="text-sm">
            Already Have an Account ?{" "}
            <Link
              href={`/${locale}/login`}
              className="underline text-[#f03328]"
            >
              {"login"}
            </Link>
          </p>
        </FormWrap>
      </form>
    </div>
  );
};

export default RegisterForm;
