import express from "express";
import { JWTAuthMiddleware } from "@backend/middlewares/JWTAuthMiddleware";
import { GetAuthenticatedMemberMiddleware } from "@backend/middlewares/GetAuthenticatedMemberMiddleware";
import { ValidateSchemaMiddleware } from "@backend/middlewares/ValidateSchemaMiddleware";
import { MemberUpdateDTOSchema } from "@common/dtos/members/MemberUpdateDTO";
import
{
    getAuthenticatedMemberController, getRatingData,
    updateAuthenticatedMemberController,
} from "@backend/controllers/MembersController";

export const MEMBERS_ROUTER = express.Router();

MEMBERS_ROUTER.get(
    "/me",
    [ JWTAuthMiddleware, GetAuthenticatedMemberMiddleware([]) ],
    getAuthenticatedMemberController
);

MEMBERS_ROUTER.put(
    "/me",
    [
        JWTAuthMiddleware,
        ValidateSchemaMiddleware(MemberUpdateDTOSchema),
        GetAuthenticatedMemberMiddleware([]),
    ],
    updateAuthenticatedMemberController
);

MEMBERS_ROUTER.get(
    "/:id/rating",
    getRatingData
);
