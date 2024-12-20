import { Request, Response } from "express";
import { getAuthenticatedMemberEntity } from "@backend/middlewares/GetAuthenticatedMemberMiddleware";
import { getJWTPayload } from "@backend/middlewares/JWTAuthMiddleware";
import { MemberUpdateDTO, MemberUpdateDTOSchema } from "@common/dtos/members/MemberUpdateDTO";
import { DI } from "@backend/Server";
import { ResponseHelpers } from "@backend/helpers/ResponseHelpers";
import { ErrorDTO } from "@common/dtos/errors/ErrorDTO";
import { MemberDTOSchema } from "@common/dtos/members/MemberDTO";

export const getAuthenticatedMemberController = async (
    req: Request,
    res: Response) =>
{
    const memberEntity = getAuthenticatedMemberEntity(req);

    res.json(MemberDTOSchema.parse(memberEntity));
}

export const updateAuthenticatedMemberController = async (
    req: Request,
    res: Response) =>
{
    const { userID } = getJWTPayload(req);

    const updateDTO: MemberUpdateDTO = req.body;

    const memberRepo = DI.memberRepo;

    let memberEntity = (await memberRepo.findOne({ id: userID }))!;

    // Thanks to GetAuthenticatedMemberMiddleware([]), memberEntity is guaranteed to exist should this controller execute.
    // if (memberEntity === null)
    // {
    //     return ResponseHelpers.respondWithNotFoundError(
    //         res,
    //         ErrorDTO.fromCustom("No such member!")
    //     );
    // }

    // Apply updateDTO's fields into memberEntity
    Object.assign(memberEntity, updateDTO);

    await DI.entityManager.flush();

    res.json(MemberUpdateDTOSchema.parse(memberEntity));
}