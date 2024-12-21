import express from "express";
import { JWTAuthMiddleware } from "@backend/middlewares/JWTAuthMiddleware";
import { GetAuthenticatedMemberMiddleware } from "@backend/middlewares/GetAuthenticatedMemberMiddleware";
import { ValidateSchemaMiddleware, ValidateSchemaMiddlewareKeyed } from "@backend/middlewares/ValidateSchemaMiddleware";

import
{
    createListingController,
    getListingsController,
    getListingsForAuthenticatedMemberController,
    getListingController,
    updateListingController,
    deleteListingController, getListingChatMessagesController, postListingChatMessagesController,
} from "@backend/controllers/ListingsController";
import { MemberListingDTOSchema } from "@common/dtos/members/listings/MemberListingDTO";
import { PaginatedRequestDTOSchema } from "@common/dtos/PaginatedRequestDTO";
import { MemberListingUpdateDTOSchema } from "@common/dtos/members/listings/MemberListingUpdateDTO";
import { ListingChatMessageCreateDTOSchema } from "@common/dtos/members/listings/chats/ListingChatMessageCreateDTO";

export const LISTINGS_ROUTER = express.Router();

LISTINGS_ROUTER.post
(
    "/",
    [
        ValidateSchemaMiddleware(MemberListingDTOSchema),
        JWTAuthMiddleware,
        GetAuthenticatedMemberMiddleware([]),
    ],
    createListingController
);

LISTINGS_ROUTER.get(
    "/",
    [
        ValidateSchemaMiddlewareKeyed({ schema: PaginatedRequestDTOSchema, isQueryParam: true })
    ],
    getListingsController
);

LISTINGS_ROUTER.get(
    "/me",
    [
        JWTAuthMiddleware,
        GetAuthenticatedMemberMiddleware([ "listings" ]),
    ],
    getListingsForAuthenticatedMemberController
);

LISTINGS_ROUTER.get(
    "/:id",
    getListingController
);

LISTINGS_ROUTER.put(
    "/:id",
    [
        ValidateSchemaMiddleware(MemberListingUpdateDTOSchema),
        JWTAuthMiddleware,
        GetAuthenticatedMemberMiddleware([]),
    ],
    updateListingController
);

LISTINGS_ROUTER.delete(
    "/:id",
    [
        JWTAuthMiddleware,
        GetAuthenticatedMemberMiddleware([]),
    ],
    deleteListingController
);

LISTINGS_ROUTER.get(
    "/:listingID/messages/",
    [
        JWTAuthMiddleware,
        GetAuthenticatedMemberMiddleware([]),
    ],
    getListingChatMessagesController
);

LISTINGS_ROUTER.get(
    "/:listingID/messages/:customerID",
    [
        ValidateSchemaMiddlewareKeyed({ schema: PaginatedRequestDTOSchema, isQueryParam: true }),
        JWTAuthMiddleware,
        GetAuthenticatedMemberMiddleware([]),
    ],
    getListingChatMessagesController
);

LISTINGS_ROUTER.post(
    "/:listingID/messages",
    [
        ValidateSchemaMiddleware(ListingChatMessageCreateDTOSchema),
        JWTAuthMiddleware,
        GetAuthenticatedMemberMiddleware([]),
    ],
    postListingChatMessagesController
);