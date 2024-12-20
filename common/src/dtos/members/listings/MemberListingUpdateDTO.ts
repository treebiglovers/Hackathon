import { z as zod } from "zod";
import { MemberListingDTOSchema } from "./MemberListingDTO";

export const MemberListingUpdateDTOSchema = MemberListingDTOSchema.partial();

export type MemberListingUpdateDTO = zod.infer<typeof MemberListingUpdateDTOSchema>;