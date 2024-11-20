"use client";
import React, { useState } from "react";
import FormWrap from "../global/FormWrap";
import Input from "../global/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../global/Heading";
import Button from "../global/Button";
import Link from "next/link";
import { useLocale } from "next-intl";
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
  const locale = useLocale();
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
    console.log(data);
    setLoading(false);
  };
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
