import { z as zod } from "zod";

export const MemberRatingDataDTOSchema = zod.object(
{
    totalRating: zod
        .number()
        .int()
        .nonnegative(),
    
    totalCount: zod
        .number()
        .int()
        .nonnegative(),
});

export type MemberRatingDataDTO = zod.infer<typeof MemberRatingDataDTOSchema>;