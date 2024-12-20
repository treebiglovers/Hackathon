import { Request, Response } from "express";
import { MemberListingDTO, MemberListingDTOSchema } from "@common/dtos/members/listings/MemberListingDTO";
import { MemberListingEntity } from "@backend/entities";
import { getAuthenticatedMemberEntity } from "@backend/middlewares/GetAuthenticatedMemberMiddleware";
import { DI } from "@backend/Server";
import { ResponseHelpers } from "@backend/helpers/ResponseHelpers";
import { PaginationHelpers } from "@backend/helpers/PaginationHelpers";
import
{
    MemberListingWithOwningMemberDTOSchema
} from "@common/dtos/members/listings/MemberListingWithOwningMemberDTO";
import { getTransformedQueryField } from "@backend/middlewares/ValidateSchemaMiddleware";
import { ErrorDTO } from "@common/dtos/errors/ErrorDTO";
import
{
    MemberListingUpdateDTO,
    MemberListingUpdateDTOSchema,
} from "@common/dtos/members/listings/MemberListingUpdateDTO";

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

export const getListingsController = async (
    req: Request,
    res: Response) =>
{
    const memberListingsRepo = DI.memberListingsRepo;

    const memberListings = await memberListingsRepo.findAll(
    {
        ...PaginationHelpers.computePaginationOptions(
            getTransformedQueryField(req)
        ),
        populate: [ "owningMember" ]
    });
    
    console.log(JSON.stringify(memberListings[0]));

    res.json(
        memberListings.map(x => MemberListingWithOwningMemberDTOSchema.parse(x))
    );
}

export const getListingsForAuthenticatedMemberController = async (
    req: Request,
    res: Response) =>
{
    const currentMember = getAuthenticatedMemberEntity(req);

    res.json(
        currentMember.listings.map(x => MemberListingDTOSchema.parse(x))
    );
};

export const updateListingController = async (
    req: Request,
    res: Response) =>
{
    const memberListingsRepo = DI.memberListingsRepo;

    const memberListing = await memberListingsRepo.findOne(
        { id: req.params.id }
    );
    
    if (memberListing === null)
    {
        return ResponseHelpers.respondWithNotFoundError(
            res,
            ErrorDTO.fromCustom("Listing not found.")
        );
    }
    
    const currentMember = getAuthenticatedMemberEntity(req);
    
    if (memberListing.owningMember.id !== currentMember.id)
    {
        return ResponseHelpers.respondWithBadRequestError(
            res,
            ErrorDTO.fromCustom("You do not own this listing.")
        );
    }

    const memberListingDTO: MemberListingUpdateDTO = req.body;
    
    Object.assign(memberListing, memberListingDTO);
    
    await DI.entityManager.flush();

    res.json(MemberListingUpdateDTOSchema.parse(memberListing));
}