import { z as zod } from "zod";
import { isAlpha } from "class-validator";
import { LimitConstants } from "../../constants/LimitConstants";
import { OptionalEntityBaseSchema } from "../EntityBaseSchema";

export const MemberDTOSchema = OptionalEntityBaseSchema.extend(
{
    name: zod
        .string()
        .trim()
        .min(LimitConstants.MIN_NAME_LENGTH)
        .max(LimitConstants.MAX_NAME_LENGTH)
        .refine(
            name => name
                .split(' ')
                .every(word => isAlpha(word) || word.length === 0),
            { message: "Name must only contain letters and / or spacing!" }
        )
        .optional(),

    avatarURL: zod
        .string()
        .url()
        .nullable()
        .optional(),
});

export type MemberDTO = zod.infer<typeof MemberDTOSchema>;