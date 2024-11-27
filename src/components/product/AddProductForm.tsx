"use client";
import { FieldValues, useForm } from "react-hook-form";
import FormWrap from "../global/FormWrap";
import Heading from "../global/Heading";
import Input from "../global/Input";
import { useState } from "react";
import TextArea from "../global/Textarea";
import CheckBox from "../global/CheckBox";
import GetAllCategories from "./GetAllCategories";

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      inStock: 0,
      brand: "",
      images: [],
      createdAt: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Heading title="Add New Product !" center />
      <Input
        register={register}
        errors={errors}
        label="Name"
        required
        id="name"
        type="text"
        disabled={loading}
      />
      <Input
        register={register}
        errors={errors}
        label="Price"
        required
        id="price"
        type="number"
        disabled={loading}
      />
      <Input
        register={register}
        errors={errors}
        label="Brand"
        required
        id="brand"
        type="text"
        disabled={loading}
      />
      <TextArea
        register={register}
        errors={errors}
        label="Descriptions"
        required
        id="description"
        disabled={loading}
      />
      <CheckBox
        register={register}
        label="This product is in stock !?"
        id="inStock"
        disabled={loading}
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <GetAllCategories />
      </div>
    </form>
  );
};

export default AddProductForm;
