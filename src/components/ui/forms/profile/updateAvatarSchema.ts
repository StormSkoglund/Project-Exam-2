import * as yup from "yup";
import { InferType } from "yup";

export const updateAvatarSchema = yup
  .object({
    avatar: yup
      .object({
        url: yup
          .string()
          .url("Must be a valid URL")
          .required("URL is required"),
        alt: yup.string().required("Alt text is required"),
      })
      .required(),
  })
  .required();

export type UpdateAvatarSchema = InferType<typeof updateAvatarSchema>;
