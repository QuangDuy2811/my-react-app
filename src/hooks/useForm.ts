import { useState } from "react";

export type FormData = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  phone: string;
  website: string;
  dob: string;
  firstName: string;
  lastName: string;
  linkedin: string;
  facebook: string;
  startDate: string;
  endDate: string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  phone: "",
  website: "",
  dob: "",
  firstName: "",
  lastName: "",
  linkedin: "",
  facebook: "",
  startDate: "",
  endDate: "",
};

export const useForm = (
  validateFn: (data: FormData) => FormErrors,
  validateOnBlur: boolean = false
) => {
  const [form, setForm] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const key = name as keyof FormData;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!validateOnBlur) return;
    const { name, value } = e.target;
    const key = name as keyof FormData;
    const singleFieldError = validateFn({ ...form, [key]: value });
    setErrors((prev) => ({ ...prev, [key]: singleFieldError[key] }));
  };

  const handleSubmit = (onSuccess: () => void) => (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateFn(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) onSuccess();
  };

  return {
    form,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
