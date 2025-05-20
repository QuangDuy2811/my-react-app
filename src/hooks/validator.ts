import type { FormData, FormErrors } from "./useForm";

export const validateForm = (form: FormData): FormErrors => {
  const errors: FormErrors = {};
  const {
    username,
    password,
    confirmPassword,
    email,
    phone,
    website,
    dob,
    firstName,
    lastName,
    startDate,
    endDate,
    linkedin,
    facebook,
  } = form;

  if (!/^[a-z]{8,}$/.test(username)) {
    errors.username = "Tối thiểu 8 ký tự, không có viết hoa, số, ký tự.";
  }

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+/.test(password)) {
    errors.password = "Cần có thường, hoa, số, ký tự đặc biệt.";
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords không khớp.";
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Email không hợp lệ.";
  }

  if (phone.length < 10 || !/^0\d+$/.test(phone)) {
    errors.phone = "Phải bắt đầu bằng 0 và có ít nhất 10 số.";
  }

  if (!website) {
    errors.website = "Website không được để trống.";
  } else {
    try {
      new URL(website);
    } catch {
      errors.website = "Website không hợp lệ.";
    }
  }
  if (!dob) errors.dob = "Ngày sinh không được trống.";
  if (!firstName) errors.firstName = "First name là bắt buộc.";
  if (!lastName) errors.lastName = "Last name là bắt buộc.";

  if (!startDate) errors.startDate = "Start date là bắt buộc.";
  if (!endDate) errors.endDate = "End date là bắt buộc.";

  if (linkedin && !/^https:\/\/(www\.)?linkedin\.com\/.*$/.test(linkedin)) {
    errors.linkedin = "Link LinkedIn không hợp lệ.";
  }

  if (facebook && !/^https:\/\/(www\.)?facebook\.com\/.*$/.test(facebook)) {
    errors.facebook = "Link Facebook không hợp lệ.";
  }

  return errors;
};
