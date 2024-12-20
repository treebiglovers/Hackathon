import { z as zod } from "zod";
import { OptionalEntityBaseSchema } from "../../EntityBaseSchema";
import { LimitConstants } from "../../../constants/LimitConstants";

export enum MemberListingState
{
    AVAILABLE = 0,
    RESERVED = 1,
    CLOSED = 2,
}

export const MemberListingDTOSchema = OptionalEntityBaseSchema.extend(
{     
    title: zod
        .string()
        .trim()
        .min(LimitConstants.MIN_LISTING_TITLE_LENGTH)
        .max(LimitConstants.MAX_LISTING_TITLE_LENGTH),

    description: zod
        .string()
        .trim()
        .min(LimitConstants.MIN_LISTING_DESCRIPTION_LENGTH)
        .max(LimitConstants.MAX_LISTING_DESCRIPTION_LENGTH),

    iconURL: zod
        .string()
        .url()
        .nullable()
        .optional(),
    
    requiredStars: zod
        .number()
        .int()
        .nonnegative()
        .optional(),
    
    price: zod
        .number()
        .nonnegative()
        .optional(),
    
    state: zod
        .nativeEnum(MemberListingState)
        .optional(),
});

export type MemberListingDTO = zod.infer<typeof MemberListingDTOSchema>;