import * as Yup from "yup";

export const validationSchema = Yup.object({
  phone: Yup.string().matches(
    /^\+[1-9]{1}[0-9]{3,14}$/,
    "Phone number must start with a +"
  ),
  address: Yup.string(),
  companyStartingTime: Yup.date(),
  facebook: Yup.string()
    .url("Invalid Facebook URL")
    .matches(
      /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(\.\?)?]+$/,
      "Invalid Facebook URL"
    )
    .nullable(),
  instagram: Yup.string()
    .url("Invalid Instagram URL")
    .matches(
      /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(\.\?)?]+$/,
      "Invalid Instagram URL"
    )
    .nullable(),
  twitter: Yup.string()
    .url("Invalid Twitter URL")
    .matches(
      /^(https?:\/\/)?(www\.)?x\.com\/[a-zA-Z0-9(\.\?)?]+$/,
      "Invalid Twitter URL"
    )
    .nullable(),
  linkedin: Yup.string()
    .url("Invalid LinkedIn URL")
    .matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[\w\u0600-\u06FF-]+\/?$/,
      "Invalid LinkedIn URL"
    )
    .nullable(),
  pinterest: Yup.string()
    .url("Invalid Pinterest URL")
    .matches(
      /^(https?:\/\/)?(www\.)?pinterest\.com\/[a-zA-Z0-9._]+\/?$/,

      "Invalid Pinterest URL"
    )
    .nullable(),
  website: Yup.string().url("Invalid website URL").nullable(),
});
