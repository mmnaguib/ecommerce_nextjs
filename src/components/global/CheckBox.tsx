import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface InputProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}
const CheckBox = ({ id, label, disabled, register }: InputProps) => {
  return (
    <div className="w-full flex flex-row items-center gap-2">
      <input type="checkbox" id={id} {...register(id)} disabled={disabled} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default CheckBox;
