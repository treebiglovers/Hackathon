import { z as zod } from "zod";
import { MemberDTOSchema } from "./MemberDTO";

export const MemberUpdateDTOSchema = MemberDTOSchema.partial()

export type MemberUpdateDTO = zod.infer<typeof MemberUpdateDTOSchema>;