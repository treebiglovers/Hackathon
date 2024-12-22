import { z as zod } from "zod";
import { OptionalEntityBaseSchema } from "../../EntityBaseSchema";
import { LimitConstants } from "../../../constants/LimitConstants";

export const MemberRatingDTOSchema = OptionalEntityBaseSchema.extend(
{
    title: zod
        .string()
        .trim()
        .min(LimitConstants.MIN_RATING_TITLE_LENGTH)
        .max(LimitConstants.MAX_RATING_TITLE_LENGTH),
    
    description: zod
        .string()
        .trim()
        .min(LimitConstants.MIN_RATING_DESCRIPTION_LENGTH)
        .max(LimitConstants.MAX_RATING_DESCRIPTION_LENGTH),
    
    rating: zod
        .number()
        .int()
        .min(LimitConstants.MIN_RATING)
        .max(LimitConstants.MAX_RATING),
});

export type MemberRatingDTO = zod.infer<typeof MemberRatingDTOSchema>;