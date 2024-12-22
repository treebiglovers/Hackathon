import { z as zod } from "zod";
import { MemberListingDTOSchema } from "./MemberListingDTO";

export const MemberListingUpdateDTOSchema = MemberListingDTOSchema
    .omit({ state: true })
    .partial();

export type MemberListingUpdateDTO = zod.infer<typeof MemberListingUpdateDTOSchema>;