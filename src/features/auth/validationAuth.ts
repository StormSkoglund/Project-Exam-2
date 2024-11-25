import * as yup from "yup";
import { emailRegex, passwordRegex } from "./regex";
import { User } from "../../store";

export function checkVenueManager(user: User) {
  if (user.venueManager === false) {
    user.venueManager = true;
  }
}

export const registerSchema = yup.object().shape({
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
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
  bio: yup.string().optional(),
  venueManager: yup.boolean().default(false),
});

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
