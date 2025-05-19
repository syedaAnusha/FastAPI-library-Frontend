import { FC, memo } from "react";

interface FormInputProps {
  id: string;
  label: string;
  type?: "text" | "number";
  value: string | number;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
  max?: number;
}

export const FormInput: FC<FormInputProps> = memo(
  ({
    id,
    label,
    type = "text",
    value,
    name,
    onChange,
    required = false,
    min,
    max,
  }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        required={required}
        min={min}
        max={max}
      />
    </div>
  )
);

FormInput.displayName = "FormInput";

export default FormInput;
