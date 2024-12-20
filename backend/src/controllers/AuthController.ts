import { Request, Response } from "express";
import { DI } from "../Server";
import { ResponseHelpers } from "../helpers/ResponseHelpers";
import { ErrorDTO } from "@common/dtos/errors/ErrorDTO";
import bcrypt from "bcrypt";
import { MemberCredentialsEntity } from "@backend/entities/MemberCredentialsEntity";
import { RegisterRequestDTO } from "@common/dtos/auth/RegisterRequestDTO";
import { MemberEntity } from "@backend/entities";
import { UniqueConstraintViolationException } from "@mikro-orm/core";
import { LoginRequestDTO } from "@common/dtos/auth/LoginRequestDTO";
import jwt from "jsonwebtoken";
import { LoginResponseDTO } from "@common/dtos/auth/LoginResponseDTO";
import { JWTPayload } from "@backend/middlewares/JWTAuthMiddleware";

export const registerMemberController = async (
    req: Request,
    res: Response
): Promise<void> =>
{
    const { email, password, name }: RegisterRequestDTO = req.body;

    // Hash the password
    const passwordHash = bcrypt.hashSync(password, 12)

    const credentialsEntity = new MemberCredentialsEntity(email, passwordHash);

    const membersRepo = DI.memberRepo;

    const memberEntity = new MemberEntity(name, credentialsEntity);
    
    const entityManager = membersRepo.getEntityManager();

    try
    {
        await entityManager.persist(memberEntity).flush();
    }

    catch (error)
    {
        if (error instanceof UniqueConstraintViolationException)
        {
            // Clear the entity manager, otherwise the findOne will still cause unique constraint violation
            entityManager.clear();

            if ((await DI.memberCredentialsRepo.findOne({ email: email })) !== null)
            {
                return ResponseHelpers.respondWithBadRequestError(
                    res,
                    ErrorDTO.fromCustom(
                        "The email you provided is already in use",
                        [ "email" ]
                    ),
                )
            }
        }

        // TODO: Write a handler that automatically respond with internal server error on unhandled exceptions
        ResponseHelpers.respondWithInternalServerError(res);

        throw error;
    }

    return ResponseHelpers.respondWithCreated(res);
}

export const loginMemberController = async (
    req: Request,
    res: Response
): Promise<void> =>
{
    const { email, password }: LoginRequestDTO = req.body;

    const credentialsRepo = DI.memberCredentialsRepo;

    const credential = await credentialsRepo.findOne(
        { email },
        { populate: [ "member" ] }
    );

    if (credential === null || !bcrypt.compareSync(password, credential.passwordHash))
    {
        return ResponseHelpers.respondWithUnauthorizedError(
            res,
            ErrorDTO.fromCustom(
                "Invalid email or password"
            )
        );
    }

    // Generate JWT with the member's ID as a claim

    const payload: JWTPayload =
    {
        userID: credential.member.id
    };

    const token = jwt.sign(
        payload,
        process.env.APP_SECRET as string,
        { expiresIn: "30d" }
    );

    res.json(new LoginResponseDTO(token));
}