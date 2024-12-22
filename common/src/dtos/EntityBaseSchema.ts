import { z as zod } from "zod";
import { SnowflakeHelpers } from "../helpers/SnowflakeHelpers";

export const SnowflakeIDSchemaField = zod
    .string()
    .refine(
        id => SnowflakeHelpers.isSnowflakeID(id),
        { message: "Invalid ID format!" }
    );

export const EntityBaseSchema = zod.object(
{
    id: SnowflakeIDSchemaField,
});

export const OptionalEntityBaseSchema = EntityBaseSchema.partial();

