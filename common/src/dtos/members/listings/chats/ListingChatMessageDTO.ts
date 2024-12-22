import { z as zod } from "zod";
import { MemberDTOSchema } from "../../MemberDTO";
import { ListingChatMessageCreateDTOSchema } from "./ListingChatMessageCreateDTO";

export const ListingChatMessageDTOSchema =  ListingChatMessageCreateDTOSchema.extend(
{
    authorMember: MemberDTOSchema.optional()
});

export type ListingChatMessageDTO = zod.infer<typeof ListingChatMessageDTOSchema>;
    