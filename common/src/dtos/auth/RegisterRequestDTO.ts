import { z as zod } from "zod";
import { LoginRequestDTOSchema } from "./LoginRequestDTO";
import { MemberDTOSchema } from "../members/MemberDTO";

export const RegisterRequestDTOSchema = LoginRequestDTOSchema.extend(
{
    name: MemberDTOSchema.shape.name,
}).required();

export type RegisterRequestDTO = zod.infer<typeof RegisterRequestDTOSchema>;