import { z as zod } from "zod";
import { SnowflakeHelpers } from "../helpers/SnowflakeHelpers";

export const EntityBaseSchema = zod.object(
{
    id: zod
        .string()
        .refine(
            id => SnowflakeHelpers.isSnowflakeID(id),
            { message: "Invalid ID format!" }
        ),
});

export const OptionalEntityBaseSchema = EntityBaseSchema.partial();

