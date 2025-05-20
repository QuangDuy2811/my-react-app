import FormSection from "../../components/FormSection";
import { useForm } from "../../hooks/useForm";
import { validateForm } from "../../hooks/validator";

const Lesson4And7 = () => {
  const form4 = useForm(validateForm, true);
  const form7 = useForm(validateForm);

  return (
    <div className="space-y-10 p-6">
      <FormSection
        form={form4.form}
        errors={form4.errors}
        handleChange={form4.handleChange}
        handleBlur={form4.handleBlur}
        handleSubmit={form4.handleSubmit(() => {
          console.log("Lesson 4 submitted successfully");
        })}
        title="Lesson 4 (onBlur)"
        buttonLabel="Submit Lesson 4"
        disabled={Object.values(form4.errors).some((e) => e)}
        color="blue"
      />
      <FormSection
        form={form7.form}
        errors={form7.errors}
        handleChange={form7.handleChange}
        handleBlur={form7.handleBlur}
        handleSubmit={form7.handleSubmit(() => {
          console.log("Lesson 7 submitted successfully");
        })}
        title="Lesson 7 (onSubmit)"
        buttonLabel="Submit Lesson 7"
        color="green"
      />
    </div>
  );
};

export default Lesson4And7;
