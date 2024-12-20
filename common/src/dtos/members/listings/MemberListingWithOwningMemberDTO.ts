import { z as zod } from "zod";
import { OptionalEntityBaseSchema } from "../../EntityBaseSchema";
import { LimitConstants } from "../../../constants/LimitConstants";
import { MemberListingDTOSchema } from "./MemberListingDTO";
import { MemberDTOSchema } from "../MemberDTO";

export enum MemberListingState
{
    AVAILABLE = 0,
    RESERVED = 1,
    CLOSED = 2,
}

export const MemberListingWithOwningMemberDTOSchema = MemberListingDTOSchema.extend(
{     
    owningMember: MemberDTOSchema,
});

export type MemberListingWithOwningMemberDTO = zod.infer<typeof MemberListingWithOwningMemberDTOSchema>;