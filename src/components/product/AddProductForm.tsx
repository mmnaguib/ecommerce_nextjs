import { FieldValues, useForm } from "react-hook-form";
import FormWrap from "../global/FormWrap";
import Heading from "../global/Heading";
import Input from "../global/Input";

const AddProductForm = () => {
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
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Heading title="Sign In To Tia Store" center />
      <FormWrap>
        <Input
          register={register}
          errors={errors}
          label="Name"
          required
          id="name"
          type="text"
        />
        <Input
          register={register}
          errors={errors}
          label="Price"
          required
          id="price"
          type="number"
        />
        <Input
          register={register}
          errors={errors}
          label="Brand"
          required
          id="brand"
          type="text"
        />
      </FormWrap>
    </form>
  );
};

export default AddProductForm;
