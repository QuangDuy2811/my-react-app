import FormSection from "../../components/FormSection";
import { useForm } from "../../hooks/useForm";
import { validateForm } from "../../hooks/validator";

const Lesson4 = () => {
  const form4 = useForm(validateForm, true);
  const form7 = useForm(validateForm);

  return (
    <div className="space-y-10 p-6">
      <h1 className="font-bold text-xl">Thực hành validate form</h1>
      <FormSection
        form={form4.form}
        errors={form4.errors}
        handleChange={form4.handleChange}
        handleBlur={form4.handleBlur}
        handleSubmit={form4.handleSubmit(() => {
          alert("Submitted successfully");
        })}
        title="Thực hành validate form - onBlur"
        buttonLabel="Submit"
        disabled={Object.values(form4.errors).some((e) => e)}
        color="blue"
      />
      <FormSection
        form={form7.form}
        errors={form7.errors}
        handleChange={form7.handleChange}
        handleBlur={form7.handleBlur}
        handleSubmit={form7.handleSubmit(() => {
          alert("Submitted successfully");
        })}
        title="Thực hành validate form -onSubmit"
        buttonLabel="Submit"
        color="blue"
      />
    </div>
  );
};

export default Lesson4;
