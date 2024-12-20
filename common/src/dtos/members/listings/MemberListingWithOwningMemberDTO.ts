import { z as zod } from "zod";
import { MemberListingDTOSchema } from "./MemberListingDTO";
import { MemberDTOSchema } from "../MemberDTO";

export const MemberListingWithOwningMemberDTOSchema = MemberListingDTOSchema.extend(
{     
    owningMember: MemberDTOSchema,
});

export type MemberListingWithOwningMemberDTO = zod.infer<typeof MemberListingWithOwningMemberDTOSchema>;