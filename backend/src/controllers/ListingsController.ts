import { Request, response, Response } from "express";
import {
    MemberListingDTO,
    MemberListingDTOSchema,
    MemberListingState
} from "@common/dtos/members/listings/MemberListingDTO";
import { MemberEntity, MemberListingEntity } from "@backend/entities";
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
import
{
    GetListingChatMessagesResponseDTOSchema
} from "@common/dtos/members/listings/chats/GetListingChatMessagesResponseDTO";
import { ListingChatEntity } from "@backend/entities/ListingChatEntity";
import {
    ListingChatMessageCreateDTO,
    ListingChatMessageCreateDTOSchema
} from "@common/dtos/members/listings/chats/ListingChatMessageCreateDTO";
import { ListingChatMessageEntity } from "@backend/entities/ListingChatMessageEntity";
import { EntityRepository } from "@mikro-orm/mysql";
import { MemberRatingEntity } from "@backend/entities/MemberRatingEntity";
import { MemberRatingDTO, MemberRatingDTOSchema } from "@common/dtos/members/ratings/MemberRatingDTO";

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

const LISTING_NOT_FOUND_ERROR = ErrorDTO.fromCustom("Listing not found.");

const LISTING_NOT_OWNED_ERROR = ErrorDTO.fromCustom("You do not own this listing.");

export const getListingController = async (
    req: Request,
    res: Response) =>
{
    const memberListingsRepo = DI.memberListingsRepo;

    const memberListing = await memberListingsRepo.findOne(
        { id: req.params.id },
        { populate: [ "owningMember" ] }
    );
    
    if (memberListing === null)
    {
        return ResponseHelpers.respondWithNotFoundError(
            res,
            LISTING_NOT_FOUND_ERROR
        );
    }

    res.json(MemberListingWithOwningMemberDTOSchema.parse(memberListing));
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
            LISTING_NOT_FOUND_ERROR
        );
    }
    
    const currentMember = getAuthenticatedMemberEntity(req);
    
    if (memberListing.owningMember.id !== currentMember.id)
    {
        return ResponseHelpers.respondWithBadRequestError(
            res,
            LISTING_NOT_OWNED_ERROR
        );
    }

    const memberListingDTO: MemberListingUpdateDTO = req.body;
    
    Object.assign(memberListing, memberListingDTO);
    
    await DI.entityManager.flush();

    res.json(MemberListingUpdateDTOSchema.parse(memberListing));
}

export const deleteListingController = async (
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
            LISTING_NOT_FOUND_ERROR
        );
    }
    
    const currentMember = getAuthenticatedMemberEntity(req);
    
    if (memberListing.owningMember.id !== currentMember.id)
    {
        return ResponseHelpers.respondWithBadRequestError(
            res,
            LISTING_NOT_OWNED_ERROR
        );
    }

    await memberListingsRepo
        .getEntityManager()
        .removeAndFlush(memberListing);
    
    ResponseHelpers.respondWithSuccessMessage(
        res,
        "Listing deleted."
    );
}

const CUSTOMER_NOT_FOUND_ERROR = ErrorDTO.fromCustom("Customer not found.");

const listingChatMessagesEnsureValidParameters = async (
    res: Response,
    authenticatedMember: MemberEntity,
    listingID: string,
    customerID: string | undefined
): Promise<[ MemberListingEntity, customerEntity: MemberEntity ] | null> =>
{
    const memberRepo = DI.memberRepo;

    let customerEntity: MemberEntity | null;

    // If the customerID is provided, ensure that the customer exists and is the authenticated member.
    if (customerID !== undefined)
    {
        customerEntity = await memberRepo.findOne({ id: customerID  });

        if (customerEntity === null)
        {
            ResponseHelpers.respondWithNotFoundError(
                res,
                CUSTOMER_NOT_FOUND_ERROR
            );
            
            return null;
        }

        // If the customerID is provided, but the listing isn't owned by the authenticated member,
        // return an error.

        if (customerEntity.id !== authenticatedMember.id)
        {
            ResponseHelpers.respondWithBadRequestError(
                res,
                ErrorDTO.fromCustom("You cannot view another member's chat messages.")
            );

            return null;
        }
    }

    else
    {
        customerEntity = authenticatedMember;
    }

    const memberListingsRepo = DI.memberListingsRepo;

    const memberListing = await memberListingsRepo.findOne(
        { id: listingID },
        { populate: [ "owningMember" ] }
    );

    if (memberListing === null)
    {
        ResponseHelpers.respondWithNotFoundError(
            res,
            LISTING_NOT_FOUND_ERROR
        );

        return null;
    }

    if (memberListing.owningMember.id === customerEntity.id)
    {
        ResponseHelpers.respondWithBadRequestError(
            res,
            ErrorDTO.fromCustom("You cannot message yourself.")
        );

        return null;
    }

    return [ memberListing, customerEntity ];
}

export const getListingChatMessagesController = async (
    req: Request,
    res: Response) =>
{
    const params = req.params;
    
    const results = await listingChatMessagesEnsureValidParameters(
        res,
        getAuthenticatedMemberEntity(req),
        params.listingID,
        params.customerID
    );
    
    if (results === null)
    {
        return;
    }
    
    const [ memberListing, customerEntity ] = results;
    
    const memberListingChatsRepo = DI.memberListingChatsRepo;

    const memberListingChat = await memberListingChatsRepo.findOne(
        { 
            listing: memberListing,
            customerMember: customerEntity
        }
    );

    if (memberListingChat === null)
    {
        return res.json(
            GetListingChatMessagesResponseDTOSchema.parse([])
        );
    }

    const memberListingChatMessagesRepo = DI.memberListingChatMessagesRepo;

    const chatMessages = await memberListingChatMessagesRepo.find(
        { owningListingChat: memberListingChat }
    );

    return res.json(
        GetListingChatMessagesResponseDTOSchema.parse(chatMessages)
    );
}

export const postListingChatMessagesController = async (
    req: Request,
    res: Response) =>
{
    const params = req.params;

    const authenticatedMember = getAuthenticatedMemberEntity(req);
    
    const results = await listingChatMessagesEnsureValidParameters(
        res,
        authenticatedMember,
        params.listingID,
        params.customerID
    );

    if (results === null)
    {
        return;
    }
    
    const [ memberListing, customerEntity ] = results;

    const memberListingChatsRepo = DI.memberListingChatsRepo;

    let memberListingChat = await memberListingChatsRepo.findOne(
        { 
            listing: memberListing,
            customerMember: customerEntity
        }
    );

    const entityManager = DI.entityManager;

    if (memberListingChat === null)
    {
        memberListingChat = new ListingChatEntity(memberListing, customerEntity);
        entityManager.persist(memberListingChat);
    }

    // Create a new chat message

    const chatMessageDTO: ListingChatMessageCreateDTO = req.body;

    const chatMessageEntity = new ListingChatMessageEntity(
        chatMessageDTO,
        authenticatedMember,
        memberListingChat,
    );

    await entityManager.persist(chatMessageEntity).flush();

    res.json(
        ListingChatMessageCreateDTOSchema.parse(chatMessageEntity)
    );
}

export const finalizeListingController = async (
    req: Request,
    res: Response) =>
{
    const params = req.params;

    const authenticatedMember = getAuthenticatedMemberEntity(req);
    
    const memberListingsRepo = DI.memberListingsRepo;
    
    const memberListing = await memberListingsRepo.findOne(
        { id: params.listingID }
    );
    
    if (memberListing === null)
    {
        return ResponseHelpers.respondWithNotFoundError(
            res,
            LISTING_NOT_FOUND_ERROR
        );
    }
    
    if (memberListing.owningMember.id !== authenticatedMember.id)
    {
        return ResponseHelpers.respondWithBadRequestError(
            res,
            LISTING_NOT_OWNED_ERROR
        );
    }
    
    if (memberListing.state === MemberListingState.FINALIZED)
    {
        return ResponseHelpers.respondWithBadRequestError(
            res,
            ErrorDTO.fromCustom("Listing already finalized.")
        );
    }
    
    const memberRepo = DI.memberRepo;
    
    const customerMember = await memberRepo.findOne({ id: params.customerID });
    
    if (customerMember === null)
    {
        return ResponseHelpers.respondWithNotFoundError(
            res,
            CUSTOMER_NOT_FOUND_ERROR
        );
    }
    
    const memberListingChatsRepo = DI.memberListingChatsRepo;
    
    const memberListingChat = await memberListingChatsRepo.findOne(
        { 
            listing: memberListing,
            customerMember: customerMember
        }
    );
    
    if (memberListingChat === null)
    {
        return ResponseHelpers.respondWithBadRequestError(
            res,
            ErrorDTO.fromCustom("No chat exists between you and this customer.")
        );
    }
    
    memberListingChat.finalized = true;
    
    memberListing.state = MemberListingState.FINALIZED;
    
    await DI.entityManager.flush();
    
    ResponseHelpers.respondWithSuccessMessage(
        res,
        "Listing finalized."
    );
}

const tryGetExistingRating = async (
    memberRatingRepo: EntityRepository<MemberRatingEntity>,
    memberListingEntity: MemberListingEntity,
    reviewingMember: MemberEntity,
    reviewedMember: MemberEntity,
) =>
{
    return memberRatingRepo.findOne(
        { 
            listing: memberListingEntity,
            reviewingMember: reviewingMember,
            receivingMember: reviewedMember
        }
    );
}

export const rateListingController = async (
    req: Request,
    res: Response) =>
{
    const params = req.params;

    const authenticatedMember = getAuthenticatedMemberEntity(req);

    const memberListingsRepo = DI.memberListingsRepo;

    const memberListing = await memberListingsRepo.findOne(
        { id: params.listingID },
        { populate: [ "owningMember" ] }
    );

    if (memberListing === null)
    {
        return ResponseHelpers.respondWithNotFoundError(
            res,
            LISTING_NOT_FOUND_ERROR
        );
    }
    
    if (memberListing.state !== MemberListingState.FINALIZED)
    {
        return ResponseHelpers.respondWithBadRequestError(
            res,
            ErrorDTO.fromCustom("Listing not yet finalized.")
        );
    }
    
    const isCustomer = memberListing.owningMember.id !== authenticatedMember.id;
    
    // For now, we assume there will only ever be one finalized chat.
    
    const memberListingChatsRepo = DI.memberListingChatsRepo;
    
    const memberListingChat = await memberListingChatsRepo.findOne(
        { listing: memberListing, finalized: true }
    );
    
    if (memberListingChat === null)
    {
        return ResponseHelpers.respondWithBadRequestError(
            res,
            ErrorDTO.fromCustom("No finalized chat exists for this listing. This implies corrupted state.")
        );
    }
    
    const targetMember = isCustomer ?
        memberListing.owningMember :
        memberListingChat.customerMember;
    
    const ratingDTO: MemberRatingDTO = req.body;
    
    const entityManager = DI.entityManager;
    
    let rating: MemberRatingEntity;
    
    try
    {
        rating = new MemberRatingEntity(
            ratingDTO,
            authenticatedMember,
            targetMember,
            memberListing
        );

        await entityManager.persist(rating).flush();
    }
    
    catch (error)
    {
        entityManager.clear();
        
        const memberRatingRepo = DI.memberRatingRepo;
        
        const existingRating = await tryGetExistingRating(
            memberRatingRepo,
            memberListing,
            authenticatedMember,
            targetMember
        );
        
        if (existingRating !== null)
        {
            return ResponseHelpers.respondWithBadRequestError(
                res,
                ErrorDTO.fromCustom("Rating already exists.")
            );
        }
        
        throw error;
    }

    return res.json(
        MemberRatingDTOSchema.parse(rating)
    );
}

