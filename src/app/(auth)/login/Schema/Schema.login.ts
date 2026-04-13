import * as zod from "zod";

export const loginSchema = zod
  .object({

    email: zod
      .string()
      .nonempty("this field is required")
      .email("invalid email"),

    password: zod
      .string()
      .nonempty("this field is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        `Has minimum 8 characters in length. Adjust it by modifying {8,}
At least one uppercase English letter. You can remove this condition by removing (?=.*?[A-Z])
At least one lowercase English letter. You can remove this condition by removing (?=.*?[a-z])
At least one digit. You can remove this condition by removing (?=.*?[0-9])
At least one special character. You can remove this condition by removing (?=.*?[#?!@$%^&*-])`,
      ),

   
  })

  export type loginSchemaType = zod.infer<typeof loginSchema>
