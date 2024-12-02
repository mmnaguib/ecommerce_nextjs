"use client";
import { FieldValues, useForm } from "react-hook-form";
import Heading from "../global/Heading";
import Input from "../global/Input";
import { useCallback, useEffect, useState } from "react";
import TextArea from "../global/Textarea";
import CheckBox from "../global/CheckBox";
import { ICategory, ImageType } from "@/interfaces";
import { getAllCategories } from "../../../actions/productsActions";
import CategoryInput from "../global/CategoryInput";
import { colors } from "@/utils/Colors";
import SelectedColor from "../global/SelectedColor";

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
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);

  console.log("images -------> " + images);
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data);
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const category = watch("category");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }
      return prev;
    });
  }, []);
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.name == "All") {
              return null;
            }
            return (
              <div key={item.id} className="col-span">
                <CategoryInput
                  key={item.id}
                  label={item.name}
                  onClick={(category) => setCustomValue("category", category)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col w-full flex-wrap gap-4">
        <div className="font-bold">
          Select The available Colors and Upload Their Images
        </div>
        <div className="text-sm">You must upload an image For Each Color</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {colors.map((item, index) => {
          return (
            <SelectedColor
              item={item}
              key={index}
              addImageToState={addImageToState}
              removeImageToState={removeImageFromState}
              isProductCreated={false}
            />
          );
        })}
      </div>
    </form>
  );
};

export default AddProductForm;
