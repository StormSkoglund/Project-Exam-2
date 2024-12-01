import * as yup from "yup";
import { InferType } from "yup";

export const createVenueSchema = yup
  .object({
    name: yup
      .string()
      .min(3, "The venue name must be at least 3 characters")
      .required("Venue name is required"),
    description: yup.string().required("Description is required"),
    media: yup.array().of(
      yup.object({
        url: yup.string().url("Invalid URL format").required("URL is required"),
        alt: yup.string().required("Alt text is required"),
      })
    ),
    price: yup
      .number()
      .required("Price is required")
      .positive("Price must be a positive number"),
    maxGuests: yup
      .number()
      .min(0, "Guests must be at least 0")
      .max(100, "Guests cannot be more than 100")
      .required("Maximum number of guests is required")
      .positive("Maximum number of guests must be a positive number")
      .integer("Maximum number of guests must be an integer"),
    rating: yup
      .number()
      .min(0, "Rating must be at least 0")
      .max(5, "Rating cannot be more than 5")
      .default(0),
    meta: yup
      .object({
        wifi: yup.boolean().default(false),
        parking: yup.boolean().default(false),
        breakfast: yup.boolean().default(false),
        pets: yup.boolean().default(false),
      })
      .default(undefined),
    location: yup
      .object({
        address: yup.string().nullable(),
        city: yup.string().nullable(),
        zip: yup.string().nullable(),
        country: yup.string().nullable(),
        continent: yup.string().nullable(),
        lat: yup.number().default(0),
        lng: yup.number().default(0),
      })
      .default(undefined),
  })
  .required();

export type CreateVenueType = InferType<typeof createVenueSchema>;
