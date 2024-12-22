import { z as zod } from "zod";
import { OptionalEntityBaseSchema } from "../../../EntityBaseSchema";
import { LimitConstants } from "../../../../constants/LimitConstants";

export const ListingChatMessageCreateDTOSchema =  OptionalEntityBaseSchema.extend(
{
    content: zod
        .string()
        .trim()
        .min(LimitConstants.MIN_LISTING_CHAT_MESSAGE_LENGTH)
        .max(LimitConstants.MAX_LISTING_CHAT_MESSAGE_LENGTH),
});

export type ListingChatMessageCreateDTO = zod.infer<typeof ListingChatMessageCreateDTOSchema>;
    