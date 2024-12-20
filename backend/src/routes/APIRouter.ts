import express from "express";
import { JWTAuthMiddleware } from "../middlewares/JWTAuthMiddleware";
import { MEMBERS_ROUTER } from "./MembersRouter";
import { AUTH_ROUTER } from "@backend/routes/AuthRouter";
import { LISTINGS_ROUTER } from "@backend/routes/ListingsRouter";

export const API_ROUTER = express.Router();

API_ROUTER.use(
    "/auth",
    AUTH_ROUTER
);

API_ROUTER.use(
    "/members",
    [ JWTAuthMiddleware ],
    MEMBERS_ROUTER
);

API_ROUTER.use(
    "/listings",
    LISTINGS_ROUTER
);
