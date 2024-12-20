import { z as zod } from "zod";
import { LimitConstants } from "../../constants/LimitConstants";

export const LoginRequestDTOSchema = zod.object(
{
    email: zod
        .string()
        .min(LimitConstants.MIN_EMAIL_LENGTH)
        .max(LimitConstants.MAX_EMAIL_LENGTH)
        // Turn it to lowercase, makes unique constraint easier to enforce.
        .toLowerCase()
        .email(),

    password: zod
        .string()
        .trim()
        .min(LimitConstants.MIN_PASSWORD_LENGTH)
        .max(LimitConstants.MAX_PASSWORD_LENGTH),
});

export type LoginRequestDTO = zod.infer<typeof LoginRequestDTOSchema>;