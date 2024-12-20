import { z as zod } from "zod";
import { isMongoId } from "class-validator";

export const EntityBaseSchema = zod.object(
{
    id: zod
        .string()
        .refine(
            id => isMongoId(id),
            { message: "Invalid ID format!" }
        ),
});

export const OptionalEntityBaseSchema = EntityBaseSchema.partial();

