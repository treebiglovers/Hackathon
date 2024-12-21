import { z as zod } from "zod";
import { ListingChatMessageDTOSchema } from "./ListingChatMessageDTO";

export const GetListingChatMessagesResponseDTOSchema = ListingChatMessageDTOSchema
    .array();

export type GetListingChatMessagesResponseDTO = zod.infer<typeof GetListingChatMessagesResponseDTOSchema>;