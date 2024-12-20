import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ResponseHelpers } from "../helpers/ResponseHelpers";
import { ErrorDTO } from "@common/dtos/errors/ErrorDTO";

const MIDDLEWARE_DATA_FIELD_NAME = "jwt_auth_middleware_data";

export type JWTPayload = Readonly<
{
    userID: string;
}>

export const getJWTPayload = (req: Request): JWTPayload =>
{
    // @ts-ignore
    return req[MIDDLEWARE_DATA_FIELD_NAME] as JWTPayload;
}

export const JWTAuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction) =>
{
    const authHeader = req.headers["authorization"];

    if (authHeader === undefined)
    {
        return ResponseHelpers.respondWithUnauthorizedError(
            res,
            ErrorDTO.fromCustom("Missing JWT token!")
        );
    }

    const token = authHeader.split(' ')[1];

    try
    {
        // @ts-ignore
        req[MIDDLEWARE_DATA_FIELD_NAME] = jwt.verify(token, process.env.APP_SECRET as string);
        next();
    }

    catch (exception)
    {
        return ResponseHelpers.respondWithUnauthorizedError(
            res,
            ErrorDTO.fromCustom("Invalid JWT token!")
        );
    }
};