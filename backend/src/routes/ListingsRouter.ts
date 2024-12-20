import express from "express";
import { JWTAuthMiddleware } from "@backend/middlewares/JWTAuthMiddleware";
import { GetAuthenticatedMemberMiddleware } from "@backend/middlewares/GetAuthenticatedMemberMiddleware";
import { ValidateSchemaMiddleware } from "@backend/middlewares/ValidateSchemaMiddleware";

import { createListingController } from "@backend/controllers/ListingsController";
import { MemberListingDTOSchema } from "@common/dtos/members/listings/MemberListingDTO";

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