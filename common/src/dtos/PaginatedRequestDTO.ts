import { z as zod } from "zod";
export const PaginatedRequestDTOSchema = zod.object(
{
    // Using coerce here, since query params are always strings unfortunately :/
    pageIndex: zod.coerce.number().int().nonnegative(),
    pageSize: zod.coerce.number().int().min(1),
}).partial();

export type PaginatedRequestDTO = zod.infer<typeof PaginatedRequestDTOSchema>;