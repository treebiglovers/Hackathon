import express from "express";
import { JWTAuthMiddleware } from "@backend/middlewares/JWTAuthMiddleware";
import { GetAuthenticatedMemberMiddleware } from "@backend/middlewares/GetAuthenticatedMemberMiddleware";
import { ValidateSchemaMiddleware, ValidateSchemaMiddlewareKeyed } from "@backend/middlewares/ValidateSchemaMiddleware";

import { createListingController, getListingsController } from "@backend/controllers/ListingsController";
import { MemberListingDTOSchema } from "@common/dtos/members/listings/MemberListingDTO";
import { PaginatedRequestDTOSchema } from "@common/dtos/PaginatedRequestDTO";

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