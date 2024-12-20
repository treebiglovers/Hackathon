import { Request, Response, NextFunction } from "express";
import { z as Zod } from "zod";
import { ResponseHelpers } from "@backend/helpers/ResponseHelpers";
import { ErrorDTO } from "@common/dtos/errors/ErrorDTO";

type Params =
{
    schema: Zod.ZodObject<any>;

    passthrough?: boolean | undefined;

    isQueryParam?: boolean | undefined;
};

export const ValidateSchemaMiddlewareKeyed = (
    { schema, passthrough, isQueryParam }: Params
) =>
{
    return ValidateSchemaMiddleware(schema, passthrough, isQueryParam);
}

export const ValidateSchemaMiddleware = (
    schema: Zod.ZodObject<any>,
    passthrough = false,
    isQueryParam = false,
) => async (req: Request, res: Response, next: NextFunction) =>
{
    if (passthrough)
    {
        schema = schema.passthrough();
    }

    const value = !isQueryParam ? req.body : req.query;

    let parsedResult = schema.safeParse(value);

    if (!parsedResult.success)
    {
        return ResponseHelpers.respondWithBadRequestError(
            res,
            ErrorDTO.fromZodError(parsedResult.error)
        );
    }

    req.body = parsedResult.data;

    next();
}