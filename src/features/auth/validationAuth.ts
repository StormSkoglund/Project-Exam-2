import * as yup from "yup";
import { emailRegex, passwordRegex } from "./regex";
import { User } from "../../store";

export function checkVenueManager(user: User) {
  if (user.venueManager === false) {
    user.venueManager = true;
  }
}

export const registerSchema = yup
  .object({
    name: yup
      .string()
      .min(3, "Your full name must be at least 3 characters")
      .required("Full name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .matches(emailRegex, "stud.noroff.no account is required")
      .required("Email is required"),
    password: yup
      .string()
      .matches(passwordRegex, "Please create a stronger password")
      .required("Password is required"),
    avatar: yup.object({
      url: yup
        .string()
        .url("Invalid URL format")
        .required("Avatar URL is required"),
      alt: yup.string().required("Avatar alt text is required"),
    }),

    venueManager: yup.boolean().default(false),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .matches(emailRegex, "stud.noroff.no account is required")
      .required("Email is required"),
    password: yup
      .string()
      .matches(passwordRegex, "Please create a stronger password")
      .required("Password is required"),
  })
  .required();
