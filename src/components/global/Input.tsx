import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  //onChange: () => void;
}
const Input = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
}: InputProps) => {
  return (
    <div className="w-full relative">
      <input
        id={id}
        type={type}
        placeholder=""
        disabled={disabled}
        autoComplete="off"
        {...(register ? register(id, { required }) : {})}
        className={`peer w-full p-4 pt-6 mb-2 outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed 
          ${errors?.[id] ? "border-rose-400" : "border-slate-300"} ${
          errors?.[id] ? "focus:border-rose-400" : "focus:border-slate-300"
        }`}
      />
      <label
        className={`absolute cursor-text text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
          errors?.[id] ? "text-rose-500" : "text-slate-400"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
