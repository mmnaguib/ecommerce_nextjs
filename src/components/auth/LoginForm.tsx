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

const LoginForm = (currentUser: IUserMenuProps) => {
  const locale = useLocale();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.push(`/${locale}/`);
        router.refresh();
        toast.success("Welcome Pro");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  useEffect(() => {
    if (currentUser) {
      router.push(`/${locale}/`);
    }
  }, []);
  if (currentUser) {
    return <p className="text-center">Logged In, Redirecting ...</p>;
  }

  return (
    <div className="m-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrap>
          <Heading title="Sign In To Tia Store" center />
          <Button
            label="Continue with Google"
            outline
            icon={AiOutlineGoogle}
            onClick={() => {}}
            custom="w-full"
          />
          <hr className="bg-slate-300 w-full h-px" />
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
            Don't Have an Account ?{" "}
            <Link
              href={`/${locale}/register`}
              className="text-[#f03328] underline"
            >
              {"register"}
            </Link>
          </p>
        </FormWrap>
      </form>
    </div>
  );
};

export default LoginForm;
