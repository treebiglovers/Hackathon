import { Request, Response } from "express";
import { MemberListingDTO, MemberListingDTOSchema } from "@common/dtos/members/listings/MemberListingDTO";
import { MemberListingEntity } from "@backend/entities";
import { getAuthenticatedMemberEntity } from "@backend/middlewares/GetAuthenticatedMemberMiddleware";
import { DI } from "@backend/Server";
import { ResponseHelpers } from "@backend/helpers/ResponseHelpers";

export const createListingController = async (
    req: Request,
    res: Response) =>
{
    const memberListingDTO: MemberListingDTO = req.body;
    
    const currentMember = getAuthenticatedMemberEntity(req);

    const memberListingEntity = new MemberListingEntity(memberListingDTO, currentMember);

    const entityManager = DI.entityManager;

    await entityManager.persist(memberListingEntity).flush();

    ResponseHelpers.respondWithCreated(res, MemberListingDTOSchema.parse(memberListingEntity));
}

