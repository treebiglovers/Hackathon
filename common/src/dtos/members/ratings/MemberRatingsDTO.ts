import { z as zod } from "zod";
import { OptionalEntityBaseSchema } from "../../EntityBaseSchema";
import { LimitConstants } from "../../../constants/LimitConstants";

export const MemberRatingsDTOSchema = OptionalEntityBaseSchema.extend(
{
    title: zod
        .string()
        .min(LimitConstants.MIN_RATING_TITLE_LENGTH)
        .max(LimitConstants.MAX_RATING_TITLE_LENGTH),
    
    description: zod
        .string()
        .min(LimitConstants.MIN_RATING_DESCRIPTION_LENGTH)
        .max(LimitConstants.MAX_RATING_DESCRIPTION_LENGTH),
    
    rating: zod
        .number()
        .min(LimitConstants.MIN_RATING)
        .max(LimitConstants.MAX_RATING),
});

export type MemberRatingsDTO = zod.infer<typeof MemberRatingsDTOSchema>;