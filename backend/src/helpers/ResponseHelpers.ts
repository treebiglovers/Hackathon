import { Response } from "express";
import { ErrorDTO } from "@common/dtos/errors/ErrorDTO";
import { StatusCodes } from "http-status-codes";
import { MessageResponseDTO } from "@common/dtos/MessageResponseDTO";


export class ResponseHelpers
{
    static respondWithNotFoundError(res: Response, errorDTO: ErrorDTO): void
    {
        res.status(StatusCodes.NOT_FOUND).json(errorDTO);
    }

    static respondWithBadRequestError(res: Response, errorDTO: ErrorDTO): void
    {
        res.status(StatusCodes.BAD_REQUEST).json(errorDTO);
    }

    static respondWithUnauthorizedError(res: Response, errorDTO: ErrorDTO): void
    {
        res.status(StatusCodes.UNAUTHORIZED).json(errorDTO);
    }

    static respondWithSuccessMessage(res: Response, message: string): void
    {
        res.status(StatusCodes.OK).json(new MessageResponseDTO(message));
    }

    static respondWithCreated(res: Response, resBody?: any): void
    {
        res.status(StatusCodes.CREATED).json(resBody);
    }

    static respondWithInternalServerError(res: Response): void
    {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            new MessageResponseDTO("An internal server error occurred.")
        );
    }
}