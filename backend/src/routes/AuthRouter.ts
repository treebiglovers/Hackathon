import express from "express";
import { loginMemberController, registerMemberController } from "@backend/controllers/AuthController";
import { ValidateSchemaMiddleware } from "@backend/middlewares/ValidateSchemaMiddleware";
import { RegisterRequestDTOSchema } from "@common/dtos/auth/RegisterRequestDTO";
import { LoginRequestDTOSchema } from "@common/dtos/auth/LoginRequestDTO";

export const AUTH_ROUTER = express.Router();

AUTH_ROUTER.post(
    "/register",
    [ ValidateSchemaMiddleware(RegisterRequestDTOSchema) ],
    registerMemberController
);

AUTH_ROUTER.post(
    "/login",
    [ ValidateSchemaMiddleware(LoginRequestDTOSchema) ],
    loginMemberController
);