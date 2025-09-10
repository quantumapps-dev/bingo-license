// eslint-disable-next-line @typescript-eslint/ban-ts-comment 

// @ts-nocheck 
 import { z } from "zod";

const todayStart = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const FormSchema = z
  .object({
    county: z.enum(["Franklin County"], {
      required_error: "County is required",
      invalid_type_error: "County must be a valid county",
    }),

    // Applicant primary info
    applicantName: z
      .string({ required_error: "Applicant name is required" })
      .trim()
      .min(2, "Applicant name must be at least 2 characters")
      .max(100, "Applicant name must be at most 100 characters"),

    entityType: z.enum(["Individual", "Organization"], {
      required_error: "Entity type is required",
    }),

    organizationName: z
      .string()
      .trim()
      .min(2, "Organization name must be at least 2 characters")
      .max(150, "Organization name must be at most 150 characters")
      .optional(),

    email: z
      .string({ required_error: "Email is required" })
      .email("Please enter a valid email address"),

    phone: z
      .string({ required_error: "Phone number is required" })
      .trim()
      .regex(
        /^(?:\+1\s?)?(?:\()?\d{3}(?:\)|[-.\s])?\d{3}[-.\s]?\d{4}$/, 
        "Please enter a valid US phone number"
      ),

    // Address
    addressStreet: z
      .string({ required_error: "Street address is required" })
      .trim()
      .min(5, "Street address must be at least 5 characters")
      .max(200, "Street address must be at most 200 characters"),

    city: z
      .string({ required_error: "City is required" })
      .trim()
      .min(2, "City must be at least 2 characters")
      .max(100, "City must be at most 100 characters"),

    state: z.enum(["PA"], {
      required_error: "State is required",
    }),

    zip: z
      .string({ required_error: "ZIP code is required" })
      .trim()
      .regex(/^\d{5}$/, "ZIP code must be 5 digits"),

    municipality: z.enum(
      [
        "Chambersburg",
        "Waynesboro",
        "Shippensburg",
        "Greencastle",
        "Mercersburg",
        "Other",
      ],
      { required_error: "Municipality is required" }
    ),

    otherMunicipality: z
      .string()
      .trim()
      .min(2, "Please specify the municipality")
      .max(100, "Municipality must be at most 100 characters")
      .optional(),

    // License details
    licenseType: z.enum(["Charitable Bingo", "Commercial Bingo"], {
      required_error: "License type is required",
    }),

    sessionsPerYear: z
      .coerce
      .number({
        required_error: "Number of sessions is required",
        invalid_type_error: "Sessions must be a number",
      })
      .int("Sessions per year must be an integer")
      .gte(1, "At least 1 session per year is required")
      .lte(365, "Sessions per year cannot exceed 365"),

    startDate: z.coerce.date({
      required_error: "License start date is required",
      invalid_type_error: "Start date is invalid",
    }).refine((d) => d >= todayStart(), {
      message: "Start date cannot be in the past",
    }),

    expirationDate: z.coerce.date({
      required_error: "License expiration date is required",
      invalid_type_error: "Expiration date is invalid",
    }),

    isNonProfit: z.boolean({ required_error: "Non-profit status is required" }),

    ein: z
      .string()
      .trim()
      .regex(/^\d{2}-\d{7}$/, "EIN must be in the format 12-3456789")
      .optional(),

    agreeToRules: z.boolean({ required_error: "Agreement is required" }).refine((v) => v === true, {
      message: "You must agree to the Franklin County bingo regulations",
    }),
  })
  .refine((data) => data.expirationDate > data.startDate, {
    message: "Expiration date must be after the start date",
    path: ["expirationDate"],
  })
  .refine(
    (d) => !(d.entityType === "Organization" && (!d.organizationName || d.organizationName.trim() === "")),
    {
      message: "Organization name is required for organizations",
      path: ["organizationName"],
    }
  )
  .superRefine((d, ctx) => {
    if (d.municipality === "Other" && (!d.otherMunicipality || d.otherMunicipality.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify the municipality",
        path: ["otherMunicipality"],
      });
    }
  });

export type FormData = z.infer<typeof FormSchema>;
