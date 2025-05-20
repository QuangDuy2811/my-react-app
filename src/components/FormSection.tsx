import type { FormData, FormErrors } from "../hooks/useForm";

type Props = {
  form: FormData;
  errors: FormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  title: string;
  buttonLabel: string;
  disabled?: boolean;
  color?: string;
};

const fields: { label: string; name: keyof FormData; type: string; placeholder: string }[] = [
  { label: "Username", name: "username", type: "text", placeholder: "Username" },
  { label: "Password", name: "password", type: "password", placeholder: "Password" },
  { label: "Confirm password", name: "confirmPassword", type: "password", placeholder: "Confirm password" },
  { label: "Email", name: "email", type: "email", placeholder: "Email address" },
  { label: "Phone", name: "phone", type: "tel", placeholder: "Phone number" },
  { label: "Website", name: "website", type: "url", placeholder: "Website" },
  { label: "Date of Birth", name: "dob", type: "date", placeholder: "" },
  { label: "First Name", name: "firstName", type: "text", placeholder: "First name" },
  { label: "Last Name", name: "lastName", type: "text", placeholder: "Last name" },
  { label: "LinkedIn", name: "linkedin", type: "url", placeholder: "LinkedIn URL" },
  { label: "Facebook", name: "facebook", type: "url", placeholder: "Facebook URL" },
  { label: "Start Date", name: "startDate", type: "date", placeholder: "" },
  { label: "End Date", name: "endDate", type: "date", placeholder: "" },
];

const FormSection = ({
  form,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  title,
  buttonLabel,
  disabled,
  color = "blue",
}: Props) => {
  // Lọc các trường ngoại trừ startDate và endDate
  const normalFields = fields.filter(f => f.name !== "startDate" && f.name !== "endDate");

  // Lấy riêng startDate và endDate
  const startDateField = fields.find(f => f.name === "startDate")!;
  const endDateField = fields.find(f => f.name === "endDate")!;

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-2 gap-4">
          {normalFields.map(({ label, name, type, placeholder }) => (
            <div key={name} className="flex flex-col">
              <label className="font-semibold mb-1">{label}</label>
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded px-3 py-2 focus:outline-none ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}
          <div className="flex space-x-4 ">
          {[startDateField, endDateField].map(({ label, name, type, placeholder }) => (
            <div key={name} className="flex flex-col flex-1">
              <label className="font-semibold mb-1">{label}</label>
              <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={form[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`border rounded px-3 py-2 focus:outline-none ${
                  errors[name] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
            </div>
          ))}
        </div>
        </div>

        {/* Start Date và End Date cùng hàng */}
        

        <button
          type="submit"
          disabled={disabled}
          className={`mt-4 px-6 py-2 rounded text-white disabled:bg-gray-400 ${
            color === "blue" ? "bg-blue-600" : color === "green" ? "bg-green-600" : "bg-gray-600"
          }`}
        >
          {buttonLabel}
        </button>
      </form>
    </section>
  );
};

export default FormSection;
