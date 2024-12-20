import { NextFunction, Request, Response } from "express";
import { ResponseHelpers } from "../helpers/ResponseHelpers";
import { ErrorDTO } from "@common/dtos/errors/ErrorDTO";
import { MemberEntity } from "@backend/entities";
import { getJWTPayload } from "@backend/middlewares/JWTAuthMiddleware";
import { DI } from "@backend/Server";
import { Populate } from "@mikro-orm/core";
import type { PopulatePath } from "@mikro-orm/core";

const AUTHENTICATED_MEMBER_DATA_FIELD_NAME = "authenticated_member_middleware_data";

export const getAuthenticatedMemberEntity = (req: Request): MemberEntity =>
{
    // @ts-ignore
    return req[AUTHENTICATED_MEMBER_DATA_FIELD_NAME] as MemberEntity;
}

export const GetAuthenticatedMemberMiddleware =
    <T extends string = never, Fields extends string = PopulatePath.ALL, Excludes extends string = never>
    (scopes: Populate<MemberEntity, T>) => async (
    req: Request,
    res: Response,
    next: NextFunction) =>
{
    const { userID } = getJWTPayload(req);

    const member = await DI.memberRepo.findOne(
        { id: userID },
        {
            populate: scopes
        }
    );

    if (member === null)
    {
        return ResponseHelpers.respondWithNotFoundError(
            res,
            ErrorDTO.fromCustom("Member no longer exist!")
        );
    }

    // @ts-ignore
    req[AUTHENTICATED_MEMBER_DATA_FIELD_NAME] = member;

    next();
};